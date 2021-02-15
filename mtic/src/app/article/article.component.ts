import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseComponent } from '../base/component.base';
import * as selectors from '../store/selectors';
import * as actions from '../store/actions';
import { filter, withLatestFrom } from 'rxjs/operators';
import { Article } from '../store/models/article.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent extends BaseComponent implements OnInit {
  article$ = this.store.select(selectors.getRouterArticle).pipe(
    filter(a => !!a)
  );
  nextArticle$ = this.store.select(selectors.getNextRouterArticle);
  previousArticle$ = this.store.select(selectors.getPreviousRouterArticle);
  captions$ = this.store.select(selectors.getCaptions);

  previousArticleButtonText = 'Vorige';
  nextArticleButtonText = 'Volgende';

  constructor(private store: Store, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(this.article$);
    this.subscribe(this.previousArticle$);
    this.subscribe(this.nextArticle$);
    this.subscribe(
      this.captions$.pipe(withLatestFrom(this.article$)),
      ([captions, article]) => {
      if (captions) {
        this.previousArticleButtonText = captions['previous-article-button-text'] || this.previousArticleButtonText;
        this.nextArticleButtonText = captions['next-article-button-text'] || this.nextArticleButtonText;
      }
      if (article?.settings) {
        this.previousArticleButtonText = article.settings.previousButtonText || this.previousArticleButtonText;
        this.nextArticleButtonText = article.settings.nextButtonText || this.previousArticleButtonText;
      }
    });
    this.store.dispatch(actions.loadContent());
  }

  to(article: Article): void {
    this.router.navigate(['article', article.id]);
  }
}
