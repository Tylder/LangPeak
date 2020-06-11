import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BaseEntryComponent} from '../../shared-entry/components/base-entry/base-entry.component';
import {LessonPartEntry, QuestionData} from '../../../../shared/models/lesson';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import Quill, {Delta} from 'quill';
import { ImageDrop } from 'quill-image-drop-module';
import Counter from '../../shared-entry/quill-lesson-editor/counter';
import {debounceTime, distinctUntilChanged, map, skip, switchMap, takeUntil, tap} from 'rxjs/operators';
import {Lesson2Service} from '../../../../shared/services/lesson2.service';
import {combineLatest, merge, Observable, ReplaySubject, Subject, zip} from 'rxjs';
import {DebounceFormService} from '../../../../shared/services/nonSingletons/debounce-form.service';


interface TextEntryData {
  data: {[key: string]: any};
}

@Component({
  selector: 'app-text-entry-edit',
  templateUrl: './text-entry-edit.component.html',
  styleUrls: ['./text-entry-edit.component.scss'],
  providers: [DebounceFormService]
})
export class TextEntryEditComponent extends BaseEntryComponent implements OnInit, OnDestroy {

  @Input() data: LessonPartEntry;

  form: FormGroup;

  toolbarOptions;

  modules = {};

  destroy$: Subject<any>;
  formChange$: ReplaySubject<any>;

  constructor(private fb: FormBuilder,
              private lesson2Service: Lesson2Service,
              private debounceFormService: DebounceFormService<TextEntryData>) {
    super();



    this.destroy$ = new Subject<any>();
    this.formChange$ = new ReplaySubject<any>(1);

    this.createToolbarOptions();

    this.modules = {
      toolbar: this.toolbarOptions
    };

    this.form = this.fb.group({
      editor: ['', Validators.required]
    });

    const formValueChanges$ = this.form
      .controls
      .editor
      .valueChanges.pipe(
        distinctUntilChanged(),
        // tap(val => console.log(val)),
        skip(1), // skip the initial
        map((formData: Delta) => {
          return {data: {...this.data.data, quill: {ops: formData.ops}}};
        }),

        // tap(val => console.log(val))
      );

    this.debounceFormService.setFormValueChanges$(formValueChanges$);
    this.debounceFormService.setDebounceMs(30000);
    this.debounceFormService.start();

    this.debounceFormService.updateDb$.pipe(
      // tap(data => console.log(data)),
      switchMap(data => this.lesson2Service.updateDocByPath$(this.data.path, data))
    ).subscribe();
  }

  ngOnInit(): void {

    if ('data' in this.data && 'quill' in this.data.data) {
      this.form.controls.editor.setValue(this.data.data.quill);
    }

  }

  ngOnDestroy(): void {
    console.log('destroy');
    this.debounceFormService.onExit();
  }


  selection(event) {
    console.log(event);
  }

  createToolbarOptions() {
    this.toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],               // custom button values
      [{ list: 'ordered'}, { list: 'bullet' }],
      [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
      [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction
      //
      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      //
      [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
      // [{ 'font': [] }],
      [{ align: [] }],

      ['clean'],                                         // remove formatting button
      // ['link', 'image', 'video'],
    ];
  }

}
