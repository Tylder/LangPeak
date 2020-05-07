import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {BehaviorSubject, from, Observable, of, ReplaySubject} from 'rxjs';
import {DeviceDetectorModule, DeviceDetectorService} from 'ngx-device-detector';
import {WebRTCConnection} from '../../classes/webRTCConnection';
import {RTCDataConnection} from '../../classes/RTCDataConnection';
import {RTCDataChannelContainer} from '../../classes/RTCDataChannelContainer';
import {filter, map, switchMap} from 'rxjs/operators';





const SERVERS: RTCConfiguration = {
  iceServers: [
    {urls: 'stun:stun.services.mozilla.com'},
    {urls: 'stun:stun.l.google.com:19302'},
    {urls: 'turn:numb.viagenie.ca', credential: 'beaver', username: 'webrtc.websitebeaver@gmail.com'}
  ]
};

const DEFAULT_CONSTRAINTS = {
  optional: []
};

const AFDB_LOCATION = '/webrtc';



@Injectable({
  providedIn: 'root'
})


export class RTCService {

  pc: any;
  channel: any;
  database: firebase.database.Reference;
  user: firebase.User;
  senderId: string;

  webRTCConnections$: BehaviorSubject<WebRTCConnection[]>;
  rtcDataConnections$: BehaviorSubject<RTCDataConnection[]>;

  constructor(public afDb: AngularFireDatabase,
              private deviceService: DeviceDetectorService) {

    this.webRTCConnections$ = new BehaviorSubject<WebRTCConnection[]>([]);
    this.rtcDataConnections$ = new BehaviorSubject<RTCDataConnection[]>([]);
  }

  createWebRTCConnection(label: string): WebRTCConnection {

    const webRTCConnection = new WebRTCConnection(this.afDb, this.deviceService, AFDB_LOCATION, label, this.guid(), SERVERS);
    const tempArray = this.webRTCConnections$.getValue();
    tempArray.push(webRTCConnection);

    this.webRTCConnections$.next(tempArray);

    return webRTCConnection;
  }

  createRTCDataConnection(label: string): RTCDataConnection {
    const rtcDataConnection = new RTCDataConnection(this.afDb, this.deviceService, AFDB_LOCATION, label, this.guid(), SERVERS);
    const tempArray = this.rtcDataConnections$.getValue();
    tempArray.push(rtcDataConnection);

    this.rtcDataConnections$.next(tempArray);

    return rtcDataConnection;
  }



  createRTCDataChannelAndSendOffer(rtcDataConnection: RTCDataConnection, channelLabel: string): RTCDataChannelContainer {

    /**
     * Convenience method to start a channel and send the offer. Helps so we dont get the order wrong
     */

    const channel = rtcDataConnection.createDataChannel(channelLabel);
    rtcDataConnection.createAndSendoffer();

    return new RTCDataChannelContainer(channel);
  }

  getConnection$(label: string): Observable<RTCDataConnection> {
    return this.rtcDataConnections$.pipe(
      filter((connections) => connections.find(con => con.label === label) !== undefined),
      map((connections) => connections.find(con => con.label === label))
    );
  }

  getRTCDataChannel$(rtcDataConnectionLabel: string, channelLabel: string): Observable<RTCDataChannelContainer> {
    return this.getConnection$(rtcDataConnectionLabel)
      .pipe(
        switchMap((connection) => connection.dataChannelCreated$),
        filter((channel) => channel.label === channelLabel),
        map((channel: RTCDataChannel) => new RTCDataChannelContainer(channel))
      );
  }

  // getConnection(label: string): RTCDataConnection | WebRTCConnection | undefined {
  //   // const tempArray: RTCDataConnection[] | WebRTCConnection[] = [];
  //   let connection: RTCDataConnection | WebRTCConnection;
  //
  //   connection = this.webRTCConnections$.getValue().find(con => con.label === label);
  //   if (connection !== undefined) { return connection; } else {
  //     return this.rtcDataConnections$.getValue().find(con => con.label === label);
  //   }
  // }
  //
  // getRTCDataChannel(rtcDataConnectionLabel: string, channelLabel: string): RTCDataChannelContainer | undefined {
  //   // return the convenient RTCDATAChannelContainer which uses Rxjs
  //
  //   const channel = this._getRTCDataChannel(rtcDataConnectionLabel, channelLabel);
  //   if (channel !== undefined) { return new RTCDataChannelContainer(channel); }
  // }
  //
  // private _getRTCDataChannel(rtcDataConnectionLabel: string, channelLabel: string): RTCDataChannel | undefined {
  //   const connection = this.getConnection(rtcDataConnectionLabel);
  //
  //   if (connection !== undefined) {
  //     return connection.dataChannels.find(ch => ch.label === channelLabel);
  //   } else {
  //     return undefined;
  //   }
  // }




  guid() {
    return (this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4());
  }
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
}

