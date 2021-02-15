import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take, tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/component.base';
import { Navigation } from 'src/app/_models/navigation.interface';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent extends BaseComponent implements OnInit {
  activeHeaderButton: string | null = null;
  navigation: Navigation[] = [
    {
      id: 'home',
      name: 'Home',
      path: '/',
      class: ''
    },
    {
      id: 'resume',
      name: 'CV',
      path: '/article/curriculum-vitae',
      class: ''
    },
    {
      id: 'experience',
      name: 'Werkervaringen',
      path: '/werkervaringen',
      class: ''
    }
  ];

  constructor(private router: Router, private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.store.select(selectors.getActiveHeaderButton)
        .pipe(tap((activeHeaderButton) => this.activeHeaderButton = activeHeaderButton))
    );
    this.subscribe(
      this.store.select(selectors.getCaptions).pipe(
        filter((c) => !!c),
        take(1)
      ),
      (captions: any) => {
        this.navigation.forEach((nav) => nav.name = captions[nav.id] || nav.name);
      }
    );
    this.subscribe(
      this.router.events.pipe(
        tap((event) => {
          if (event instanceof NavigationEnd) {
            const nav = this.navigation.find(x => x.path === event.url);
            if (nav) {
              this.activeHeaderButton = nav.id || '';
              this.store.dispatch(actions.menuItemSelected({ name: this.activeHeaderButton }));
            }
          }
        })
      )
    );
  }

  navigate(nav: Navigation): void {
    this.store.dispatch(actions.menuItemSelected({ name: nav.id || '' }));
    this.router.navigate([nav.path]);
  }

  getClass(nav: Navigation): string {
    const isActive = this.activeHeaderButton === nav.id;
    return `${nav.class} ${isActive ? 'active' : ''}`.trim();
  }
}
