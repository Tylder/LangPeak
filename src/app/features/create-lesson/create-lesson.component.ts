import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {SidebarService} from '../../shared/services/sidebar.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.scss']
})
export class CreateLessonComponent implements OnInit {

  isMobile$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver,
              public sidebarService: SidebarService) {
    this.isMobile$ = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(
      map(result => result.matches)
    );
  }

  ngOnInit(): void {
  }

}
