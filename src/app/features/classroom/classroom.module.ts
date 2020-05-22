import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './components/test/test.component';
import {ClassroomRoutingModule} from './classroom-routing.module';
import { FillBlanksGroupComponent } from './modules/lesson/modules/questions-entry/question-group-types/fill-blanks/components/fill-blanks-group/fill-blanks-group.component';
import { ClassroomComponent } from './classroom.component';
import { SharedModule } from '../../shared/shared.module';
import { NavigatorBarComponent } from './components/navigator-bar/navigator-bar.component';



@NgModule({
  declarations: [
    TestComponent,
    ClassroomComponent,
    NavigatorBarComponent,
  ],
  imports: [
    CommonModule,
    ClassroomRoutingModule,
    SharedModule
  ]
})
export class ClassroomModule { }
