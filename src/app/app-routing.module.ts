import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RtcTestComponent} from './components/rtc-test/rtc-test.component';
import {RtcTest2Component} from './components/rtc-test2/rtc-test2.component';
import {RtcTestdataComponent} from './components/rtc-testdata/rtc-testdata.component';
import {HomeModule} from './features/home/home.module';


const routes: Routes = [
  { path: 'rtc2', component: RtcTest2Component},
  { path: 'data', component: RtcTestdataComponent},
  { path: 'classroom', loadChildren: () => import('./features/classroom/classroom.module').then(m => m.ClassroomModule) },
  { path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
