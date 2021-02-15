import { Action, createReducer, on } from '@ngrx/store';
import { State } from './models/state.model';
import * as fromActions from './actions';
import { Content } from './models/content.model';
import { Article } from './models/article.model';
import { ArticleSettings } from './models/articleSettings.model';
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
                articles: content.content.articles.map(a => {
                    const article: Article = {
                        id: a.id,
                        title: a.title,
                        content: getContent(a.content),
                        class: a.class,
                        tags: a.tags || [],
                        settings: a.settings || new ArticleSettings()
                    };
                    return article;
                })
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
                activeHeaderButton: action.payload.routerState.root?.firstChild?.data?.activeHeaderButton || state.activeHeaderButton
            };
        }
    )
);

export function reducer(state: State | undefined, action: Action): State {
    return stateReducer(state, action);
}

const getContent: (content: any) => string = ((content: any): string => {
    if (!content) {
        return '';
    }
    if (typeof content === 'string') {
        return content;
    }
    const a: string[] = content;
    if (!content?.length) {
        return '';
    }
    const result = a.reduce((prev, current) => `${prev}${prev.endsWith('>') ? '' : '\r\n'}${current.startsWith('|') ? '' : '\r\n'}${current}`);
    return result;
});
