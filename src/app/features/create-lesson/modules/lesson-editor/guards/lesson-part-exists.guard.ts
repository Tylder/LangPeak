import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable, of} from 'rxjs';
import {Lesson2Service} from '../../../../../shared/services/lesson2.service';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LessonPartExistsGuard implements CanActivate {

  constructor(private lesson2Service: Lesson2Service) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    //
    // return of(true);

    console.log(next.paramMap);

    return this.lesson2Service.lesson$.pipe(
      switchMap(lesson => {
        return this.lesson2Service.listenForLessonPart$(lesson.id, next.paramMap.get('partId')).pipe(
          tap(part => this.lesson2Service.lessonPart$.next(part)),
          tap(part => console.log(part)),
          map(() => true),
          catchError(() => {
            return of(false);
          })
        );
      })
    );
  }

}
