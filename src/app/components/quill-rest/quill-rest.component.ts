import {Component, Input, OnInit, ViewChild} from '@angular/core';

import Quill from 'quill';
import ImageResize from 'quill-image-resize-module';
import { ImageDrop } from 'quill-image-drop-module';
import {LessonPartEntry} from '../../shared/models/lesson';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

/**
 *
 */
// BEGIN allow image alignment styles
const ImageFormatAttributesList = [
  'alt',
  'height',
  'width',
  'style'
];

const BaseImageFormat = Quill.import('formats/image');
class ImageFormat extends BaseImageFormat {
  static formats(domNode) {
    return ImageFormatAttributesList.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  format(name, value) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

Quill.register(ImageFormat, true);
// END allow image alignment styles
//

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);
// Quill.register('modules/counter', Counter);

@Component({
  selector: 'app-quill-rest',
  templateUrl: './quill-rest.component.html',
  styleUrls: ['./quill-rest.component.scss']
})
export class QuillRestComponent implements OnInit {

  @Input() data: LessonPartEntry;

  form: FormGroup;

  modules = {};

  constructor(private fb: FormBuilder) {

    this.modules = {
      imageResize: {},
      imageDrop: true,
    };

    this.form = this.fb.group({
      editor: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    console.log(this.data);


    this.form
      .controls
      .editor
      .valueChanges.pipe(

    ).subscribe(val => console.log(val));
  }

  selection(event) {
    console.log(event);
  }

}
