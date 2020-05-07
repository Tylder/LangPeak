import {Component, OnInit, ViewChild} from '@angular/core';
import {RTCService} from '../../core/services/rtc.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {WebRTCConnection} from '../../classes/webRTCConnection';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-rtc-test2',
  templateUrl: './rtc-test2.component.html',
  styleUrls: ['./rtc-test2.component.scss']
})
export class RtcTest2Component implements OnInit {

  webRTCConnection: WebRTCConnection;

  @ViewChild('me') me: any;
  @ViewChild('remote') remote: any;

  stats: any;

  form: FormGroup;

  bandwidthOptions = ['unlimited', 250, 500, 1000, 1500, 2000];

  constructor(private rtcService: RTCService,
              private formBuilder: FormBuilder, ) {
    this.webRTCConnection = this.rtcService.createWebRTCConnection('test');

    this.webRTCConnection.peerConnection.ontrack = event => {
      this.remote.nativeElement.srcObject = event.streams[0]; // use ontrack
      console.log(event);
    };



  }

  ngOnInit(): void {
    // this.showMe();
    this.showMe();
    this.form = this.formBuilder.group({
      bandwidth: new FormControl(null, {})
    });

    this.form.controls.bandwidth.valueChanges.pipe(
      map(val => {
        return val === 'unlimited' ? 0 : val;
      })
    ).subscribe(val => {
      this.webRTCConnection.setMediaStreamOutboundBitrate(this.webRTCConnection.mediaStreams[0], val, 'video');
    });
  }

  createRTCOffer() {

    this.webRTCConnection.createAndSendoffer();
    this.stats = this.webRTCConnection.getStatsObservableFromMediaStream(this.webRTCConnection.mediaStreams[0]);


    this.webRTCConnection.getBitrateObservableFromMediaStream(
      this.webRTCConnection.mediaStreams[0], 10000).subscribe(data => console.log(data));

  }

  showMe() {

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(stream => (this.me.nativeElement.srcObject = stream))
      .then(stream => this.webRTCConnection.addTracksFromUserMediaStream(stream));
  }

  hangUp() {
    this.webRTCConnection.closeAllMediaStreams();
    this.webRTCConnection.peerConnection.close();
  }

  showStats() {
    this.webRTCConnection.createSenderStatsObservable();
    console.log(this.webRTCConnection._isBrowserCompatibleWithSetParameters());
    console.log(this.webRTCConnection._getRTCSendersFromMediaStream(this.webRTCConnection.mediaStreams[0]));
    // console.log(this.webRTCConnection.peerConnection.getStreamById())
  }
}
