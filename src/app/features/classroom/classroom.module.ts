import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './components/test/test.component';
import {ClassroomRoutingModule} from './classroom-routing.module';



@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    ClassroomRoutingModule,
  ]
})
export class ClassroomModule { }
