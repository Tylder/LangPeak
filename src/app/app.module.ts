import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { RtcTestComponent } from './components/rtc-test/rtc-test.component';
import { RtcTest2Component } from './components/rtc-test2/rtc-test2.component';
import {RTCService} from './core/services/rtc.service';
import {SharedModule} from './shared/shared.module';
import {DeviceDetectorService} from 'ngx-device-detector';
import {RtcTestdataComponent} from './components/rtc-testdata/rtc-testdata.component';
import {CoreModule} from './core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LongClickDirective } from './shared/directives/long-click.directive';
import { MixinTestComponent } from './components/mixin-test/mixin-test.component';
import { MixinTest2Component } from './components/mixin-test2/mixin-test2.component';
import { LayoutTest2Component } from './components/layout-test/layout-test2.component';
import {LayoutTestComponent} from './components/layout-test2/layout-test.component';
import { QuillRestComponent } from './components/quill-rest/quill-rest.component';

@NgModule({
  declarations: [
    AppComponent,
    RtcTestComponent,
    RtcTest2Component,
    RtcTestdataComponent,
    MixinTestComponent,
    MixinTest2Component,
    LayoutTestComponent,
    LayoutTest2Component,
    QuillRestComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    CoreModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
