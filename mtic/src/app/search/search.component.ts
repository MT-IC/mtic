import { BaseComponent } from '../_base/component.base';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { search, searchResult } from '../store/actions';
import { Actions, ofType } from '@ngrx/effects';
import { Article } from '../store/models/article.model';
import * as selectors from '../store/selectors';
import { filter, tap } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends BaseComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  suggestions: string[] = [];
  articles: Article[] = [];

  constructor(
    private store: Store,
    private actions: Actions,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.store.select(selectors.getSearchSuggestions),
      (result) => this.suggestions = result);
    this.subscribe(
      this.searchControl.valueChanges,
      (searchText) => {
        this.router.navigate(
          [],
          {
            relativeTo: this.activatedRoute,
            queryParams: { q: searchText }
          });
      }
    );
    this.subscribe(
      this.actions.pipe(
        ofType(searchResult),
      ),
      ({articles}) => this.articles = articles
    );
    this.subscribe(
      this.activatedRoute.queryParams.pipe(
        filter((params: Params) => params && params.q),
        tap((params: Params) => {
          this.articles = [];
          this.searchControl.setValue(params.q);
        }),
        filter((params: Params) => params.q.length >= 3)
      ),
      (params) => {
        this.store.dispatch(search({ search: params.q }));
      }
    );
  }

  suggest(suggestion: string): void {
    const currentSearch: string = this.searchControl.value;
    if (currentSearch && currentSearch.split(' ').some(t => t.toLowerCase() === suggestion.toLowerCase())) {
      return;
    }

    this.searchControl.setValue(currentSearch ? currentSearch + ' ' + suggestion : suggestion);
  }
}
