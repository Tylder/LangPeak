import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkTableModule} from '@angular/cdk/table';
import {ClickableDirective} from './directives/clickable.directive';
import {IsSmallDirective} from './directives/is-small.directive';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AngularResizedEventModule} from 'angular-resize-event';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {AngularFirestoreModule} from '@angular/fire/firestore';


@NgModule({
  declarations: [
    ClickableDirective,
    IsSmallDirective,

  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    // AngularFireDatabaseModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule
  ],
  exports: [
    CommonModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,

    ReactiveFormsModule,
    HttpClientModule,
    CdkTableModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    DragDropModule,
    NgxSpinnerModule,
    AngularResizedEventModule,

  ],
  providers: [
  ]
})
export class SharedModule { }
