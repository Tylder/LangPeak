import {DropListRef} from '@angular/cdk/drag-drop';
import {ElementRef, NgZone} from '@angular/core';
import {DragDropRegistry} from '@angular/cdk/drag-drop/drag-drop-registry';
import {DragRefInternal as DragRef} from '@angular/cdk/drag-drop/drag-ref';
import {ViewportRuler} from '@angular/cdk/scrolling';

export class DragAndDropContainer<T> {

  connectedDropListsRefs: DropListRef[] = [];

  constructor() {}


  addConnectedDropListRef(dropListRef: DropListRef) {
    this.connectedDropListsRefs.push(dropListRef);
    this.updateConnections();
  }

  removeConnectedDropListRef(dropListRef: DropListRef) {
    const index = this.connectedDropListsRefs.findIndex(ref => ref === dropListRef);
    this.connectedDropListsRefs.splice(index, 1);
    this.updateConnections();
  }

  private updateConnections() {
    this.connectedDropListsRefs.forEach((ref) => {
      ref.connectedTo(this.connectedDropListsRefs);
    });
  }


}
