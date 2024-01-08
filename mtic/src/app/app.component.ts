import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BaseComponent } from './_base/component.base';
import * as actions from './store/actions';
import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  @ViewChild('content') content: any;

  constructor(private router: Router, private store: Store, private update: SwUpdate) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.router.events,
      (e) => {
        if (e instanceof NavigationEnd) {
          this.content?.nativeElement?.scrollTo(0, 0);
          const w: any = window;
          w.gtag(e.type, e.urlAfterRedirects);
        }
      }
    );
    this.subscribe(
      this.update.versionUpdates.pipe(filter(e => e.type == 'VERSION_DETECTED')),
      event => {
        console.log("Update", event);
        this.update.activateUpdate().then(() => document.location.reload());
      }
    )
    this.store.dispatch(actions.loadContent());
  }
}
