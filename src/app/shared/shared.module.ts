import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './material.module';
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
import {UtilsService} from './services/utils.service';
import {LongClickDirective} from './directives/long-click.directive';
import {DynamicContentDirective} from './directives/dynamic-content.directive';
import {NavigatorSideBarLoaderComponent} from './components/navigator-side-bar-loader/navigator-side-bar-loader.component';
import {SidebarService} from './services/sidebar.service';
import {LessonService} from './services/lesson.service';
import {Lesson2Service} from './services/lesson2.service';
import {BaseTableFsComponent} from './components/base-table-fs.component';



@NgModule({
  declarations: [
    ClickableDirective,
    IsSmallDirective,
    LongClickDirective,
    DynamicContentDirective,
    NavigatorSideBarLoaderComponent,
    BaseTableFsComponent,
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
    // NoopAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,

    ReactiveFormsModule,
    HttpClientModule,
    CdkTableModule,


    DragDropModule,
    NgxSpinnerModule,
    AngularResizedEventModule,
    ClickableDirective,
    LongClickDirective,
    DynamicContentDirective,
    NavigatorSideBarLoaderComponent,
  ],

})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [UtilsService, SidebarService, LessonService, Lesson2Service]
    };
  }
}
