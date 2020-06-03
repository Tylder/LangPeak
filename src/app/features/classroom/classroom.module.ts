import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './components/test/test.component';
import {ClassroomRoutingModule} from './classroom-routing.module';
import { FillBlanksGroupComponent } from '../lesson-entries/display-entries/questions-entry/question-group-types/fill-blanks/components/fill-blanks-group/fill-blanks-group.component';
import { ClassroomComponent } from './classroom.component';
import { SharedModule } from '../../shared/shared.module';
import { NavigatorSideBarLoaderComponent } from '../../shared/components/navigator-side-bar-loader/navigator-side-bar-loader.component';



@NgModule({
  declarations: [
    TestComponent,
    ClassroomComponent,
  ],
  imports: [
    CommonModule,
    ClassroomRoutingModule,
    SharedModule
  ]
})
export class ClassroomModule { }
