import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './models/state.model';
import { Article } from './models/article.model';
import { ArticleSettings } from './models/articleSettings.model';
import { selectRouteParam, selectRouteData } from './route/route.selectors';

// Content selectors
export const FEATURE = 'content';

export const getState = createFeatureSelector<State>(FEATURE);

export const getActiveHeaderButton = createSelector(getState, (state) => state?.activeHeaderButton);

export const getContent = createSelector(getState, (state) => state?.content);

export const getCaptions = createSelector(getContent, (content) => content?.captions);

export const getArticles = createSelector(getContent, (content) => content?.articles);

export const getCategoryArticles = createSelector(
    getArticles,
    selectRouteData,
    (articles, data) =>
    getArticlesByCategory(articles, data?.category));

export const getCodeUrl = createSelector(
    selectRouteData,
    (data) => data?.codeUrl);

export const getRouterArticleId = createSelector(selectRouteParam('articleId'), (articleId) =>
    typeof articleId === 'string' ? articleId : null);

export const getRouterArticle = createSelector(
    getArticles,
    getRouterArticleId,
    (articles: Article[] | undefined, articleId: string | null) => {
        return (articles && articleId)
        ? articles?.find(x => x.id === articleId && !x.settings.hidden) || notFoundArticle
        : undefined;
    });

export const getNextRouterArticle = createSelector(
    getArticles,
    getRouterArticleId,
    (articles: Article[] | undefined, articleId: string | null) => {
        if (!(articles && articleId)) {
            return undefined;
        }
        const article = articles.find(x => x.id === articleId && !x.settings.hidden);
        if (!article) {
            return undefined;
        }
        const categoryArticles = getArticlesByCategory(articles, Object.keys(article.settings.categoryIndexes)[0], true) || [];
        const index = categoryArticles.indexOf(article);
        return (index >= 0 && index < categoryArticles.length - 1)
            ? categoryArticles[index + 1]
            : undefined;
    });

export const getPreviousRouterArticle = createSelector(
    getArticles,
    getRouterArticleId,
    (articles: Article[] | undefined, articleId: string | null) => {
        if (!(articles && articleId)) {
            return undefined;
        }
        const article = articles.find(x => x.id === articleId && !x.settings.hidden);
        if (!article) {
            return undefined;
        }
        const categoryArticles = getArticlesByCategory(articles, Object.keys(article.settings.categoryIndexes)[0], true) || [];
        const index = categoryArticles.indexOf(article);
        return (index > 0)
            ? categoryArticles[index - 1]
            : undefined;
    });

export const getSearchSuggestions = createSelector(
    getArticles,
    (articles: Article[] | undefined) => {
        if (!articles || !articles.length) {
            return [];
        }

        const maxLength = 10;
        const result: string[] = [];
        for (const a of articles.filter(x => x.tags)) {
            for (const t of a.tags) {
                if (!result.includes(t)) {
                    result.push(t);
                    if (result.length >= maxLength) {
                        return result;
                    }
                }
            }
        }
        return result;
    }
);

const notFoundArticle: Article = {
    id: 'not-found',
    title: 'Niet gevonden',
    content: '',
    cleanContent: '',
    class: null,
    tags: [],
    settings: new ArticleSettings()
};

const getArticlesByCategory: (
    articles: Article[] | undefined,
    category: string,
    browsable?: boolean | undefined) => Article[] | undefined = (
        articles: Article[] | undefined,
        category: string, browsable:
        boolean | undefined = undefined): Article[] | undefined => {
    return articles?.filter(
        x => x.settings.categoryIndexes[category] !== undefined &&
            !x.settings.hidden &&
            (browsable === undefined || x.settings.browsable === browsable)
    )?.sort(
        (a, b) => a.settings.categoryIndexes[category] - b.settings.categoryIndexes[category]
    );
};
