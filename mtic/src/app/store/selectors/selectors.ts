import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../models/state.model';
import * as fromRouter from '@ngrx/router-store';
import { Params } from '@angular/router';

interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
    data: any;
}

// Router selectors
const getRouterFeature = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');
export const getRouterState = createSelector(getRouterFeature, (state) => state?.state);
export const getRouterParams = createSelector(getRouterState, (state) => state?.params);
export const getRouterParamsbyKey = createSelector(
    getRouterParams,
    (routerParams: Params, key: string) => routerParams && routerParams[key]);

// Content selectors
export const FEATURE = 'content';
export const getInspectionStateFeature = createFeatureSelector<State>(FEATURE);

export const getState = createSelector(getInspectionStateFeature, (state) => state);

export const getContent = createSelector(getState, (state) => state?.content);

export const getArticles = createSelector(getContent, (content) => content?.articles);

const getRouterArticleId = createSelector(getRouterParamsbyKey, (params) => {
    const value = params.articleId;
    return typeof value === 'string' && value.length ? Number(value) : null;
});

export const getArticle = createSelector(
    getArticles, getRouterArticleId,
    (articles, articleId) => articles && articleId ? articles?.find(x => x.id === articleId) : null);
