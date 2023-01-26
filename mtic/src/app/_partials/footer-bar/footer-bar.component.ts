import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCodeUrl } from 'src/app/store/selectors';
import { BaseComponent } from 'src/app/_base/component.base';

@Component({
  selector: 'app-footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.scss']
})
export class FooterBarComponent extends BaseComponent implements OnInit {
  year: number = new Date().getFullYear();
  codeUrl: string | null = null;

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.store.select(getCodeUrl),
      (codeUrl) => {
        this.codeUrl = codeUrl;
      }
    );
  }
}
