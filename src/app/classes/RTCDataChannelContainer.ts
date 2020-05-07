import {from, fromEvent, fromEventPattern, Observable, ReplaySubject} from 'rxjs';

export class RTCDataChannelContainer {

  channel: RTCDataChannel;

  open$: Observable<Event>;
  close$: Observable<Event>;
  bufferedamountlow$: Observable<Event>;
  error$: Observable<RTCErrorEvent>;

  receivedMessage$: ReplaySubject<MessageEvent>;


  constructor(channel: RTCDataChannel) {
    this.channel = channel;

    this.receivedMessage$ = new ReplaySubject<MessageEvent>(1);

    this.open$ = fromEventPattern(handler => this.channel.addEventListener('open', handler));
    this.close$ = fromEventPattern(handler => this.channel.addEventListener('close', handler));
    this.error$ = fromEventPattern(handler => this.channel.addEventListener('error', handler));
    this.bufferedamountlow$ = fromEventPattern(handler => this.channel.addEventListener('bufferedamountlow', handler));

    // this.channel.onmessage = event => console.log(event);

    fromEventPattern(handler => this.channel.addEventListener('message', handler)).subscribe(this.receivedMessage$);

    // this.message$.subscribe(val => console.log(val));
    // this.channel.addEventListener('open', event => this.open$.next(event));
    // this.channel.addEventListener('message', event => this.message$.next(event));
  }

}
