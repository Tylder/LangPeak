import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RtcTestComponent} from './components/rtc-test/rtc-test.component';
import {RtcTest2Component} from './components/rtc-test2/rtc-test2.component';
import {RtcTestdataComponent} from './components/rtc-testdata/rtc-testdata.component';
import {HomeModule} from './features/home/home.module';
import {MixinTestComponent} from './components/mixin-test/mixin-test.component';
import {MixinTest2Component} from './components/mixin-test2/mixin-test2.component';
import {LayoutTest2Component} from './components/layout-test/layout-test2.component';
import {LayoutTestComponent} from './components/layout-test2/layout-test.component';
import {QuillRestComponent} from './components/quill-rest/quill-rest.component';


const routes: Routes = [
  { path: 'rtc2', component: RtcTest2Component},
  { path: 'data', component: RtcTestdataComponent},
  { path: 'mixin', component: MixinTestComponent},
  { path: 'mixin2', component: MixinTest2Component},
  { path: 'layout', component: LayoutTestComponent},
  { path: 'layout2', component: LayoutTest2Component},
  { path: 'quill', component: QuillRestComponent},
  { path: 'lesson-creator', loadChildren: () => import('./features/create-lesson/create-lesson.module').then(m => m.CreateLessonModule) },
  { path: 'classroom', loadChildren: () => import('./features/classroom/classroom.module').then(m => m.ClassroomModule) },
  { path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
