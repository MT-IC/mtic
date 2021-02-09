import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Navigation } from 'src/app/_models/navigation.interface';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent {
  navigation: Navigation[] = [
    {
      name: 'Home',
      path: '/',
      class: ''
    }
  ];

  constructor(private router: Router) { }

  navigate(nav: Navigation): void {
    this.router.navigate([nav.path]);
  }

  getClass(nav: Navigation): string {
    const isActive = this.router.routerState.snapshot.url === nav.path;
    return `${nav.class} ${isActive ? 'active' : ''}`.trim();
  }
}
