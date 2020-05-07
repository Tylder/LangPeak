import {BehaviorSubject, forkJoin, from, fromEventPattern, interval, Observable, pipe, ReplaySubject, timer} from 'rxjs';
import {AngularFireAction, AngularFireDatabase, DatabaseSnapshot} from '@angular/fire/database';
import {OnDestroy} from '@angular/core';
import {AngularFireList} from '@angular/fire/database/interfaces';
import {delay, first, map, pairwise, startWith, switchMap, take, tap} from 'rxjs/operators';
import {DeviceDetectorService} from 'ngx-device-detector';
import {RTCDataChannelContainer} from './RTCDataChannelContainer';

export interface WebRTCSignalMessage {
  sender: string;
  data: any;
}

export interface TrackReports {
  trackId: string;
  track: MediaStreamTrack;
  reports: any[];
}

export interface MediaStreamStats {
  streamId: string;
  stream: MediaStream;
  tracks: TrackReports[];
}


export interface BitrateData {
  bitrate: number;
  bytes: number;

  headerBitrate: number;
  headerBytes: number;

  packets: number;
  packetsRate: number;

}

export interface TrackBitrate {
  trackId: string;
  track: MediaStreamTrack;
  bitrateData: BitrateData;
}

export interface MediaStreamBitrate {
  streamId: string;
  stream: MediaStream;
  bitrateDataTotal: BitrateData;
  bitRateDataPerTrack: TrackBitrate[];
}

export class BaseRTCConnection implements OnDestroy {

  peerConnection: RTCPeerConnection;

  peerConnectionState$: BehaviorSubject<RTCPeerConnectionState>;
  peerConnectionIceState$: BehaviorSubject<RTCIceConnectionState>;

  // iceCandidates$: ReplaySubject<any>;
  uuid: string;
  webRTCDbRef: AngularFireList<any>;

  database: firebase.database.Reference;

  dataChannels: RTCDataChannel[] = [];

  mediaStreams: MediaStream[] = [];

  label: string;  // meant to identify the stream

  constructor(private afDb: AngularFireDatabase,
              public deviceService: DeviceDetectorService,
              dbLoc: string,
              label: string,
              uuid: string,
              config: RTCConfiguration,
              ) {

    this.peerConnection = new RTCPeerConnection(config);
    this.uuid = uuid;
    this.label = label;

    this.peerConnection.onicecandidate = (event) => this._onIceCandidateHandler(event);

    this.webRTCDbRef = this.afDb.list(dbLoc);

    this.database = this.afDb.database.ref(dbLoc);

    this.database.on('child_added', (data) => this._readMessageAndAct(data.val())); // TODO turn generic

    this.peerConnectionState$ = new BehaviorSubject<RTCPeerConnectionState>(this.peerConnection.connectionState);
    this.peerConnectionIceState$ = new BehaviorSubject<RTCIceConnectionState>(this.peerConnection.iceConnectionState);

    fromEventPattern(handler => this.peerConnection.addEventListener('connectionstatechange', handler))
      .pipe(map(() => this.peerConnection.connectionState))
      .subscribe(this.peerConnectionState$);

    fromEventPattern(handler => this.peerConnection.addEventListener('iceconnectionstatechange', handler))
      .pipe(map(() => this.peerConnection.iceConnectionState))
      .subscribe(this.peerConnectionIceState$);
    // this.peerConnection.onconnectionstatechange = () => { this.peerConnectionState$.next(this.peerConnection.connectionState); };
    // this.peerConnection.oniceconnectionstatechange = () => { this.peerConnectionIceState$.next(this.peerConnection.iceConnectionState); };
  }

  ngOnDestroy(): void {
    this._cleanUpDB();
  }

  private _cleanUpDB() {
    this.webRTCDbRef.remove();
  }

  private _onIceCandidateHandler(event: RTCPeerConnectionIceEvent) {
    console.log(event);
    if (event.candidate) {
      this._sendMessage(JSON.stringify({ ice: event.candidate }));
    } else { console.log('all ice sent'); }
  }

  _getStatsObservableFromTracks(tracks: MediaStreamTrack[]): Observable<TrackReports[]>{
    const statsObservables$ = [];

    const trackReports: TrackReports[] = [];

    tracks.forEach((track) => {

      const trackReport: TrackReports = {
        trackId: track.id,
        track,
        reports: []
      };

      const statObservable$ = from(this.peerConnection.getStats(track))
        .pipe(
          take(1),
          tap((report) => {
            report.forEach((value, key, parent) => {
              trackReport.reports.push(value);
            });
            trackReports.push(trackReport);
            // data.tracks.push(trackReport);
          })
        );
      statsObservables$.push(statObservable$);  // add all getStats Observables together

    });

    // join all getStatsObservables and return an observable that relies on them finishing first
    return forkJoin(statsObservables$).pipe(
      map(() => trackReports)
    );
  }

  _isBrowserCompatibleWithSetParameters(): boolean {
    // In Chrome, use RTCRtpSender.setParameters to change bandwidth without
    // (local) renegotiation. Note that this will be within the envelope of
    // the initial maximum bandwidth negotiated via SDP.

    const deviceInfo = this.deviceService.getDeviceInfo();

    return (deviceInfo.browser.toLowerCase() === 'chrome' || deviceInfo.browser.toLowerCase() === 'safari' ||
      (deviceInfo.browser.toLowerCase() === 'firefox' && Number(deviceInfo.browser_version) >= 64)) &&
      'RTCRtpSender' in window && 'setParameters' in window.RTCRtpSender.prototype;
  }

  createSenderStatsObservable(sender?: RTCRtpSender, intervalMs = 1000) {
    const senders = this.peerConnection.getSenders();
    const receivers = this.peerConnection.getReceivers();

    console.log(senders);
    console.log(receivers);

    // senders.forEach((_sender) => {});

  }

  createAndSendoffer(options?: RTCOfferOptions) {

    /** Creates an offer message that is used by a remote peer to start the back and forth to create a connection
     *  This is step 1.
     *
     *  Creates an offer and then uses that offer to set its LocalDescription,
     *  Then it send it to the remote peer to have it set to its RemoteDescription
     */

    this.peerConnection
      .createOffer(options)
      .then(offer => this.peerConnection.setLocalDescription(offer))
      .then(() => {
        // console.log(this.peerConnection.localDescription);
        this._sendMessage(JSON.stringify({ sdp: this.peerConnection.localDescription }));
      })
      .catch(error => console.log('ERROR when trying to create OFFER', error));
  }

  _createAndSendAnswer(offer: RTCSessionDescription) {

    /** Takes an offer from a remote peer and creates an answer.
     *  This is step 2.
     *
     *  Called when an offer from a remote peer is received.
     *  Take that offer and set it to RemoteDescription.
     *  Then create an answer and set that to it selfs LocalDescription.
     *  Thn send send the answer to the remote peer that initiated the connection.
     *  They will then use the answer to set to their RemoteDescription.
     */

    console.log('SEND ANSWER');

    this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
      .then(() => this.peerConnection.createAnswer())
      .then(answer => this.peerConnection.setLocalDescription(answer))
      .then(() => {
        this._sendMessage(JSON.stringify({ sdp: this.peerConnection.localDescription }));
        console.log(this.peerConnection.localDescription);
      })
      .catch(error => console.log('ERROR when trying to create ANSWER', error));
  }

  _sendMessage(data: any) {

    console.log('SEND MSG,', data);

    const signalMessage: WebRTCSignalMessage = {
      sender: this.uuid,
      data
    };

    const msg = this.webRTCDbRef.push(signalMessage);
    msg.remove();  // remove msg once sent..all listening peers will still receive the snapshotchange
  }

  _readMessageAndAct(msg: WebRTCSignalMessage) {
    if (!msg) { return; }

    const data = JSON.parse(msg.data);

    // means it was sent by someone else TODO should be checked against the User Id you wish to connect with
    if (msg.sender !== this.uuid) {
      console.log('MSG RECEIVED, ', msg, 'localId: ', this.uuid);
      console.log(data);

      if (data.ice !== undefined) { // if we receive an ICE we add it
        console.log('IIIICCCCEEE');
        try {
          this.peerConnection.addIceCandidate(new RTCIceCandidate(data.ice));
        } catch (e) {
          console.log('ERROR with adding Ice Candidate', e, data.ice);
        }

      }
      else if (data.sdp.type === 'offer') {
        const offer = data.sdp as RTCSessionDescription;
        this._createAndSendAnswer(offer);
      }
      else if (data.sdp.type === 'answer') {
        const answer = data.sdp as RTCSessionDescription;
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      }
    }
  }
}
