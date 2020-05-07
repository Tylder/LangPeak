import {Component, OnInit, ViewChild} from '@angular/core';
import {RTCService} from '../../core/services/rtc.service';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

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

@Component({
  selector: 'app-rtc-test',
  templateUrl: './rtc-test.component.html',
  styleUrls: ['./rtc-test.component.scss']
})
export class RtcTestComponent implements OnInit {

  pc: any;
  channel: any;
  database: firebase.database.Reference;
  user: firebase.User;
  senderId: string;

  @ViewChild('me') me: any;
  @ViewChild('remote') remote: any;

  constructor(
    public afDb: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.setupWebRtc();
  }

  setupWebRtc() {
    this.senderId = this.guid();
    const channelName = '/webrtc';
    this.channel = this.afDb.list(channelName);
    this.database = this.afDb.database.ref(channelName);

    this.database.on('child_added', this.readMessage.bind(this));
    this.pc = new RTCPeerConnection(SERVERS);
    this.pc.onicecandidate = event => {
      if (event.candidate) {
        this.sendMessage(this.senderId, JSON.stringify({ ice: event.candidate }));
        console.log(event);
      } else { console.log('all ice sent'); }
    };

    this.pc.ontrack = event =>
      (this.remote.nativeElement.srcObject = event.streams[0]); // use ontrack

    this.showMe();
  }

  sendMessage(senderId, data) {
    const msg = this.channel.push({
      sender: senderId,
      message: data
    });
    msg.remove();
  }

  readMessage(data) {
    if (!data) { return; }
    const msg = JSON.parse(data.val().message);
    const sender = data.val().sender;
    if (sender !== this.senderId) {
      if (msg.ice !== undefined) {
        this.pc.addIceCandidate(new RTCIceCandidate(msg.ice));
      }
      else if (msg.sdp.type === 'offer') {
        this.pc
          .setRemoteDescription(new RTCSessionDescription(msg.sdp))
          .then(() => this.pc.createAnswer())
          .then(answer => this.pc.setLocalDescription(answer))
          .then(() =>
            this.sendMessage(
              this.senderId,
              JSON.stringify({ sdp: this.pc.localDescription })
            )
          );
 }
      else if (msg.sdp.type === 'answer') {
        this.pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
 }
    }
  }

  showMe() {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(stream => (this.me.nativeElement.srcObject = stream))
      .then(stream => this.pc.addStream(stream));
  }

  showRemote() {
    this.pc
      .createOffer()
      .then(offer => this.pc.setLocalDescription(offer))
      .then(() =>
        this.sendMessage(
          this.senderId,
          JSON.stringify({ sdp: this.pc.localDescription })
        )
      );
  }

  guid() {
    return (this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4());
  }
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

}
