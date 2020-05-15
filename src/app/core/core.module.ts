import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RTCService} from './services/rtc.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import { CoreComponent } from './core.component';



@NgModule({
  declarations: [CoreComponent],
  imports: [
    CommonModule
  ],
  providers: [RTCService, DeviceDetectorService],
})
export class CoreModule { }
