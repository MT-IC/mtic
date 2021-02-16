import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { BaseComponent } from './base/component.base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  @ViewChild('content') content: any;

  constructor(private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.router.events,
      (e) => {
        if (e instanceof NavigationEnd) {
          this.content?.nativeElement?.scrollTo(0, 0);
        }
      });
  }
}
