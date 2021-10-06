import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BaseComponent } from './_base/component.base';
import * as actions from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  @ViewChild('content') content: any;

  constructor(private router: Router, private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.router.events,
      (e) => {
        if (e instanceof NavigationEnd) {
          this.content?.nativeElement?.scrollTo(0, 0);
        }
      }
    );
    this.store.dispatch(actions.loadContent());
  }
}
