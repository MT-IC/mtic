import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Service } from '../app.service';
import * as actions from './actions';
import { map, catchError, exhaustMap, withLatestFrom, filter, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as selectors from './selectors';
import { Content } from './models/content.model';

@Injectable()
export class Effects {
    constructor(private actions$: Actions, private store: Store, private service: Service) {}

    loadContent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadContent),
            withLatestFrom(this.store.select(selectors.getContent)),
            exhaustMap(([_, existingContent]) => {
                const loadingNecessary = !existingContent?.articles?.length;
                const content: Observable<Content> = loadingNecessary
                    ? this.service.loadContent()
                    : of(existingContent || new Content());

                return content.pipe(
                    map(c => loadingNecessary ? actions.loadContentSuccess({ content: c }) : actions.loadContentNotNecessary()),
                    catchError((error) => of(actions.loadContentFailure({ error })))
                );
            })
        )
    );

    searchArticles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.search),
            withLatestFrom(this.store.select(selectors.getArticles)),
            filter(([_, articles]) => !!articles),
            exhaustMap(([{ search }, articles]) => {
                const terms = search.toLowerCase().split(' ').filter(t => t.length);
                const result = (articles || [])
                    .filter(a =>
                        a.settings.browsable &&
                        !a.settings.hidden &&
                        terms.every(t => 
                            a.content.toLowerCase().includes(t) || 
                            (a.tags && a.tags.some(x => x.toLowerCase() === t))));
                return of(actions.searchResult({ articles: result }));
            })
        )
    );
}

export const effects: any[] = [Effects];
