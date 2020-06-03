import { Injectable } from '@angular/core';
import {BaseMockHttpService} from './base-mock-http.service';
import {Lesson, LessonPartFull} from '../models/lesson';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LESSONS} from './mock/lessons-MOCK';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService extends BaseMockHttpService<Lesson> {

  MOCK_DATA = LESSONS;

  constructor(snackBar: MatSnackBar) {
    super(snackBar);
  }

  getPart$(): Observable<LessonPartFull> {
    return of(this.MOCK_DATA[0].mainParts[0] as LessonPartFull);
  }
}
