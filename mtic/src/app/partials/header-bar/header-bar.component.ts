import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
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
      name: 'Home',
      path: '/',
      class: ''
    },
    {
      name: 'CV',
      path: '/article/curriculum-vitae',
      class: ''
    },
    {
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
      this.router.events.pipe(
        tap((event) => {
          if (event instanceof NavigationEnd) {
            const nav = this.navigation.find(x => x.path === event.url);
            if (nav) {
              this.activeHeaderButton = nav.name || '';
              this.store.dispatch(actions.menuItemSelected({ name: this.activeHeaderButton }));
            }
          }
        })
      )
    );
  }

  navigate(nav: Navigation): void {
    this.store.dispatch(actions.menuItemSelected({ name: nav.name || '' }));
    this.router.navigate([nav.path]);
  }

  getClass(nav: Navigation): string {
    const isActive = this.activeHeaderButton === nav.name;
    return `${nav.class} ${isActive ? 'active' : ''}`.trim();
  }
}
