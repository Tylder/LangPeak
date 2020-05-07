import {ChangeDetectorRef, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {RTCService} from '../../core/services/rtc.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {WebRTCConnection} from '../../classes/webRTCConnection';
import {map, switchMap, tap} from 'rxjs/operators';
import {RTCDataConnection} from '../../classes/RTCDataConnection';
import {RTCDataChannelContainer} from '../../classes/RTCDataChannelContainer';
import {interval, ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-rtc-test2',
  templateUrl: './rtc-testdata.component.html',
  styleUrls: ['./rtc-testdata.component.scss']
})
export class RtcTestdataComponent implements OnInit {

  rtcDataConnection: RTCDataConnection;

  stats: any;

  form: FormGroup;

  receivedMessage$: ReplaySubject<MessageEvent>;

  dataChannelContainer: RTCDataChannelContainer;


  constructor(private rtcService: RTCService,
              private formBuilder: FormBuilder,
              private zone: NgZone,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {

    this.rtcDataConnection = this.rtcService.createRTCDataConnection('test');

    this.receivedMessage$ = new ReplaySubject<MessageEvent>(1);

    this.rtcService.getRTCDataChannel$('test', 'dataChannel')
      .pipe(
        tap((channel) => this.channelReceivedHandler(channel)),
        switchMap((channel) => channel.receivedMessage$),
        tap((messageEvent: MessageEvent) => this.messageReceivedHandler(messageEvent)),
      ).subscribe();

    this.form = this.formBuilder.group({
      input: new FormControl(null, {})
    });


  }

  messageReceivedHandler(event: MessageEvent) {
    console.log(event);
    this.receivedMessage$.next(event.data);
  }

  channelReceivedHandler(channel: RTCDataChannelContainer) {
    console.log('CHANNEL RECEIVED');
    this.dataChannelContainer = channel;
  }

  send() {
    const value = this.form.controls.input.value;

    console.log(value);
    this.dataChannelContainer.channel.send(value);
    this.form.reset();
  }

  connect() {
    this.rtcService.createRTCDataChannelAndSendOffer(this.rtcDataConnection, 'dataChannel');
  }

  disconnect() {
    this.rtcDataConnection.closeAllDataChannels();
    this.rtcDataConnection.peerConnection.close();
  }

  showStats() {
    this.rtcDataConnection.createSenderStatsObservable();
    console.log(this.rtcDataConnection._isBrowserCompatibleWithSetParameters());
    // console.log(this.webRTCConnection.peerConnection.getStreamById())
  }
}
