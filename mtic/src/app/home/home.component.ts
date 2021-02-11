import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseComponent } from '../base/component.base';
import * as actions from '../store/actions';
import { Article } from '../store/models/article.model';
import * as selectors from '../store/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {
  articles$: Observable<Article[] | undefined> = this.store.select(selectors.getHomeArticles);

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(this.articles$);
    this.store.dispatch(actions.loadContent());
  }
}
