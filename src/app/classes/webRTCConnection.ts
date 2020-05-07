import {BehaviorSubject, forkJoin, from, interval, Observable, pipe, ReplaySubject, timer} from 'rxjs';
import {AngularFireAction, AngularFireDatabase, DatabaseSnapshot} from '@angular/fire/database';
import {AngularFireList} from '@angular/fire/database/interfaces';
import {delay, first, map, pairwise, startWith, switchMap, take, tap} from 'rxjs/operators';
import {DeviceDetectorService} from 'ngx-device-detector';
import {BaseRTCConnection, BitrateData, MediaStreamBitrate, MediaStreamStats, TrackBitrate, TrackReports} from './baseRTCConnection';


export class WebRTCConnection extends BaseRTCConnection {

  constructor(afDb: AngularFireDatabase,
              deviceService: DeviceDetectorService,
              dbLoc: string,
              label: string,
              uuid: string,
              config: RTCConfiguration,
              ) {


      super(afDb, deviceService, dbLoc, label, uuid, config);
  }

  closeMediaStream(stream: MediaStream) {
    const index = this.mediaStreams.indexOf(stream);

    stream.getTracks().forEach(track => track.stop());
    this.mediaStreams.splice(index, 1);
  }

  closeAllMediaStreams() {
    this.mediaStreams.forEach((stream) => this.closeMediaStream(stream));
  }

  addTracksFromUserMediaStream(stream: MediaStream) {
    stream.getTracks().forEach(track => this.peerConnection.addTrack(track, stream));
    this.mediaStreams.push(stream);
  }

  getBitrateObservableFromMediaStream(stream: MediaStream, intervalMs = 1000): Observable<MediaStreamBitrate> {

    /**
     *  Goes through each track on the MediaStream and calculates the bitrate, it also gives the total of all tracks
     *  Requires time = intervalMs * 2 before if returns because we need 2 values to calculate the bitrate
     *  Only gives the outbound bitrate..
     */

    return this.getStatsObservableFromMediaStream(stream, intervalMs)
      .pipe(
        pairwise(), // so that we get the 2 latest values
        map(([previousMediaStats, currentMediaStats]: MediaStreamStats[]) => {

          const tracksBitrateData: TrackBitrate[] = [];

          currentMediaStats.tracks.forEach((trackReports: TrackReports, trackIndex) => {

            // console.log(trackReports.reports);
            trackReports.reports.forEach(report => {

              console.log(report);

              if (report.type === 'outbound-rtp' && previousMediaStats) {

                // previousReport used to calculate bitrate
                const previousReport = previousMediaStats.tracks.filter(prevTrack => prevTrack.trackId === trackReports.trackId)[0]
                  .reports.filter(prevReport => prevReport.id === report.id)[0];

                const now = report.timestamp;

                let bitrateData: BitrateData;

                bitrateData = {
                  bitrate:  8 * (report.bytesSent - previousReport.bytesSent) / (now - previousReport.timestamp),
                  bytes: report.bytesSent,

                  headerBitrate: 8 * (report.headerBytesSent - previousReport.headerBytesSent) / (now - previousReport.timestamp),
                  headerBytes: report.headerBytesSent,

                  packets: report.packetsSent,
                  packetsRate: 1000 * (report.packetsSent - previousReport.packetsSent) / (now - previousReport.timestamp),
                };

                const trackBitrate: TrackBitrate = {
                  trackId: trackReports.trackId,
                  track: trackReports.track,
                  bitrateData
                };

                tracksBitrateData.push(trackBitrate);  // push it to the array
              }
            });
          });
          /**
           *  We have gone through each track and report
           *  We now add it all together to get the total MediaStream Bitrate
           */

            // tslint:disable-next-line:one-variable-per-declaration
          let bitrate = 0., bytes = 0, headerBitrate = 0., headerBytes = 0, packets = 0, packetsRate = 0.;

          tracksBitrateData.forEach((trackBitRateData) => {
            bitrate += trackBitRateData.bitrateData.bitrate;
            bytes += trackBitRateData.bitrateData.bytes;
            headerBitrate += trackBitRateData.bitrateData.headerBitrate;
            headerBytes += trackBitRateData.bitrateData.headerBytes;
            packets += trackBitRateData.bitrateData.packets;
            packetsRate += trackBitRateData.bitrateData.packetsRate;
          });

          const totalBitrateData: BitrateData = {
            bitrate,
            bytes,
            headerBitrate,
            headerBytes,
            packets,
            packetsRate,
          };

          const data: MediaStreamBitrate = {
            streamId: currentMediaStats.streamId,
            stream,
            bitrateDataTotal: totalBitrateData,
            bitRateDataPerTrack: tracksBitrateData  // to start
          };

          return data;
        })
      );
  }

  getStatsObservableFromMediaStream(stream: MediaStream, intervalMs = 1000): Observable<MediaStreamStats> {

    return interval(intervalMs)
      .pipe(
        switchMap(() => {

          const data: MediaStreamStats = {
            streamId: stream.id,
            stream,
            tracks: []
          };

          return super._getStatsObservableFromTracks(stream.getTracks()).pipe(
            tap((trackReports) => data.tracks = trackReports), //  add the tracks
            map(() => data) // return the data
          );
        })
      );
  }

  _getRTCSendersFromMediaStream(mediaStream: MediaStream) {
    const senders = this.peerConnection.getSenders();

    const mediaTracks = mediaStream.getTracks();
    const mediaTracksIds = [];
    mediaTracks.forEach(track => mediaTracksIds.push(track.id));

    return senders.filter(sender => mediaTracksIds.includes(sender.track.id) );
  }

  setMediaStreamOutboundBitrate(mediaStream: MediaStream, bitrate: number, kind = 'video') {
    if (this._isBrowserCompatibleWithSetParameters()) {
      // In Chrome, use RTCRtpSender.setParameters to change bandwidth without
      // (local) renegotiation. Note that this will be within the envelope of
      // the initial maximum bandwidth negotiated via SDP.

      const senders = this._getRTCSendersFromMediaStream(mediaStream);
      // tslint:disable-next-line:variable-name
      const sender: RTCRtpSender = senders.filter(_sender => _sender.track.kind.toLowerCase() === kind)[0];
      const parameters = sender.getParameters();

      if (!parameters.encodings) {
        parameters.encodings = [{}];
      }
      if (bitrate === 0) { // unlimited if 0
        delete parameters.encodings[0].maxBitrate;
      } else {
        parameters.encodings[0].maxBitrate = bitrate * 1000;
      }

      sender.setParameters(parameters)
        .then(() => {
          return true;
        })
        .catch(e => {
          console.error(e);
          return false;
        });
    }

    // Fallback to the SDP munging with local renegotiation way of limiting
    // the bandwidth.
    this.peerConnection.createOffer()
      .then(offer => this.peerConnection.setLocalDescription(offer))
      .then(() => {
        const desc = {
          type: this.peerConnection.remoteDescription.type,
          sdp: bitrate === 0 ?
            this._removeBitrateRestriction(this.peerConnection.remoteDescription.sdp) :
            this._updateBitrateRestriction(this.peerConnection.remoteDescription.sdp, bitrate)
        };
        console.log('Applying bandwidth restriction to setRemoteDescription:\n' +
          desc.sdp);
        return this.peerConnection.setRemoteDescription(desc);
      })
      .then(() => {
        return true;
      })
      .catch(e => {
        console.error(e);
        return false;
      });

  }

  private _updateBitrateRestriction(sdp: any, bitrate: number) {
    let modifier = 'AS';
    if (this.deviceService.browser.toLowerCase() === 'firefox') {
      // tslint:disable-next-line:no-bitwise
      bitrate = (bitrate >>> 1) * 1000;
      modifier = 'TIAS';
    }
    if (sdp.indexOf('b=' + modifier + ':') === -1) {
      // insert b= after c= line.
      sdp = sdp.replace(/c=IN (.*)\r\n/, 'c=IN $1\r\nb=' + modifier + ':' + bitrate + '\r\n');
    } else {
      sdp = sdp.replace(new RegExp('b=' + modifier + ':.*\r\n'), 'b=' + modifier + ':' + bitrate + '\r\n');
    }
    return sdp;
  }

  private _removeBitrateRestriction(sdp) {
    return sdp.replace(/b=AS:.*\r\n/, '').replace(/b=TIAS:.*\r\n/, '');
  }
}
