import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './models/state.model';
import { Article } from './models/article.model';
import { ArticleSettings } from './models/articleSettings.model';
import { selectRouteParam } from './route/route.selectors';

// Content selectors
export const FEATURE = 'content';

export const getState = createFeatureSelector<State>(FEATURE);

export const getContent = createSelector(getState, (state) => state?.content);

export const getArticles = createSelector(getContent, (content) => content?.articles);

export const getHomeArticles = createSelector(getArticles, (articles) =>
    articles?.filter(
        x => x.settings.categoryIndexes.home
    )?.sort(
        (a, b) => a.settings.categoryIndexes.home - b.settings.categoryIndexes.home)
    );

export const getRouterArticleId = createSelector(selectRouteParam('articleId'), (articleId) =>
    typeof articleId === 'string' ? articleId : null);

export const getRouterArticle = createSelector(
    getArticles,
    getRouterArticleId,
    (articles: Article[] | undefined, articleId: string | null) => {
        return (articles && articleId)
        ? articles?.find(x => x.id === articleId) || notFoundArticle
        : undefined;
    });

const notFoundArticle: Article = {
    id: 'not-found',
    title: 'Niet gevonden',
    content: '',
    class: null,
    tags: [],
    settings: new ArticleSettings()
};
