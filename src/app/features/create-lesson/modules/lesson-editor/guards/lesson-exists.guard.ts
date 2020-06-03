import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate} from '@angular/router';
import {forkJoin, Observable, of, zip} from 'rxjs';
import {Lesson2Service} from '../../../../../shared/services/lesson2.service';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {LessonPartPartial} from '../../../../../shared/models/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonExistsGuard implements CanActivate {

  constructor(private lesson2Service: Lesson2Service) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    //
    // return of(true);
    const lessonId = next.paramMap.get('lessonId');

    // return this.lesson2Service.createLessonListeners(lessonId);

    return this.lesson2Service.listenForLesson$(lessonId).pipe(
      tap(val => console.log(val)),
      map(() => true),
        catchError(() => {
          return of(false);
        })
    );

  }
}
