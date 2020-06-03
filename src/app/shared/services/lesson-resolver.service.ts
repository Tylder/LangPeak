import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Lesson} from '../models/lesson';
import {LessonService} from './lesson.service';
import {EMPTY, Observable, of} from 'rxjs';
import {Lesson2Service} from './lesson2.service';
import {mergeMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LessonResolverService implements Resolve<Lesson> {

  constructor(private router: Router, private lesson2Service: Lesson2Service) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Lesson> | Observable<never> {
    const id = route.paramMap.get('lessonId');

    console.log(id);

    return this.lesson2Service.listenForLesson$(id).pipe(
      take(1),
      tap(lesson => console.log(lesson))
    );
      // take(1),
      // mergeMap(lesson => {
      //   if (lesson) {
      //     return of(lesson);
      //   } else { // id not found
      //     this.router.navigate(['/']);
      //     return EMPTY;
      //   }
      // })
    // );
  }
}
