import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import Counter from './counter';
import {QuillModule} from 'ngx-quill';
import { ImageResize } from 'quill-image-resize-module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QuillModule.forRoot({
      // customModules: [{
      //   implementation: Counter,
      //   path: 'modules/counter'
      // }],
      customOptions: [{
        import: 'formats/font',
        whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      }]
    }),
  ],
  exports: [QuillModule]
})
export class QuillEditAndViewModule { }
