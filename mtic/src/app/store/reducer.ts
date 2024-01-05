import { Action, createReducer, on } from '@ngrx/store';
import { State } from './models/state.model';
import * as fromActions from './actions';
import { Content } from './models/content.model';
import { Article } from './models/article.model';
import { routerNavigatedAction } from './route';

const initialState = new State();

const stateReducer = createReducer<State, Action>(
    initialState,
    on(
        fromActions.loadContent,
        (state) => {
            return {
                ...state,
                loading: true
            };
        }),
    on(
        fromActions.loadContentNotNecessary,
        (state) => {
            return {
                ...state,
                loading: false
            };
        }),
    on(
        fromActions.loadContentSuccess,
        (state, content) => {
            const newContent: Content = {
                captions: { ...content.content.captions },
                articles: content.content.articles.map(a => new Article(a))
            };
            return {
                ...state,
                loading: false,
                content: newContent
            };
        }),
    on(
        fromActions.loadContentFailure,
        (state) => {
            return {
                ...state,
                loading: false,
                loaded: true
            };
        }),
    on(
        routerNavigatedAction,
        (state, action) => {
            return {
                ...state,
                activeHeaderButton: action.payload.routerState.root?.firstChild?.data?.['activeHeaderButton'] || state.activeHeaderButton
            };
        }
    )
);

export function reducer(state: State | undefined, action: Action): State {
    return stateReducer(state, action);
}
