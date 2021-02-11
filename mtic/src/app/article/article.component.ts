import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseComponent } from '../base/component.base';
import * as selectors from '../store/selectors';
import * as actions from '../store/actions';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent extends BaseComponent implements OnInit {
  article$ = this.store.select(selectors.getRouterArticle).pipe(
    filter(a => !!a),
    take(1)
  );

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(this.article$);
    this.store.dispatch(actions.loadContent());
  }
}
