import {BaseRTCConnection} from './baseRTCConnection';
import {AngularFireDatabase} from '@angular/fire/database';
import {DeviceDetectorService} from 'ngx-device-detector';
import {RTCDataChannelContainer} from './RTCDataChannelContainer';
import {fromEventPattern, Observable, ReplaySubject} from 'rxjs';
import {map, tap} from 'rxjs/operators';


export class RTCDataConnection extends BaseRTCConnection {

  dataChannels$: ReplaySubject<RTCDataChannel[]>;  // emits all containers whenever 1 is added or removed...

  dataChannelCreated$: ReplaySubject<RTCDataChannel>; // emits the new container when its created

  constructor(afDb: AngularFireDatabase,
              deviceService: DeviceDetectorService,
              dbLoc: string,
              label: string,
              uuid: string,
              config: RTCConfiguration,
  ) {

    super(afDb, deviceService, dbLoc, label, uuid, config);


    this.dataChannels$ = new ReplaySubject<RTCDataChannel[]>(1);
    this.dataChannelCreated$ = new ReplaySubject<RTCDataChannel>(0);
    fromEventPattern(handler => this.peerConnection.addEventListener('datachannel', handler))
      .pipe(
        tap(event => console.log(event)),
        map((event: RTCDataChannelEvent) => event.channel)
      )
      .subscribe(this.dataChannelCreated$);

    this.dataChannelCreated$.pipe(
      tap((channel) => {
        if (!this.dataChannels.includes(channel)) { this.dataChannels.push(channel); }
        this.dataChannels$.next(this.dataChannels);
      })
    ).subscribe();

    // this.dataChannelCreated$.subscribe(event => console.log(event));

    // this.peerConnection.ondatachannel = (event) => this._onDataChannelHandler(event);
  }


  createDataChannel(label: string, dataChannelDict?: RTCDataChannelInit): RTCDataChannel {
    const channel = this.peerConnection.createDataChannel(label, dataChannelDict);

    // const channelExtended = new RTCDataChannelContainer(channel);

    this.dataChannels.push(channel);

    this.dataChannels$.next(this.dataChannels);
    this.dataChannelCreated$.next(channel);

    return channel;
  }

  getChannel(label: string): RTCDataChannel {
    return this.dataChannels.filter(channel => channel.label === label)[0];
  }

  closeAllDataChannels() {
    this.dataChannels.forEach(
      (channel: RTCDataChannel) => {
        channel.close();

      });
  }


}
