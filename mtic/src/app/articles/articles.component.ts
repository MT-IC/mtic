import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseComponent } from '../_base/component.base';
import { Article } from '../store/models/article.model';
import * as selectors from '../store/selectors';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent extends BaseComponent implements OnInit {
  articles$: Observable<Article[] | undefined> = this.store.select(selectors.getCategoryArticles);

  constructor(private store: Store, private route: ActivatedRoute) {
    super();
  }

  getClass(): string {
    return `articles ${this.route.snapshot.data['category']}`.trim();
  }

  ngOnInit(): void {
    this.subscribe(this.articles$);
  }
}
