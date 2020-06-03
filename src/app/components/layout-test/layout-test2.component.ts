import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../../shared/services/sidebar.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-layout-test2',
  templateUrl: './layout-test2.component.html',
  styleUrls: ['./layout-test2.component.scss']
})
export class LayoutTest2Component implements OnInit {

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
