import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {EntryContentDirective} from '../../directives/entry-content.directive';
import {FillBlanksGroupComponent} from '../fill-blanks/fill-blanks-group.component';

@Component({
  selector: 'app-base-entry',
  template: ``,
})
export class BaseEntryComponent<T> implements OnInit {

  @ViewChild(EntryContentDirective, {static: true}) entryContentHost: EntryContentDirective;
  @Input() data: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }


  ngOnInit(): void {}

  loadEntry() {}
}
