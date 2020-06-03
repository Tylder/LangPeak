import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SidebarService} from '../../shared/services/sidebar.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

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
