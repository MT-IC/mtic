import { createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { Params } from '@angular/router';

interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
    data: any;
}

export type routerReducerState = fromRouter.RouterReducerState<RouterStateUrl>;

export const FEATURE = 'router';

const getRouterFeature = createFeatureSelector<routerReducerState>(FEATURE);

export const {
    selectCurrentRoute, // select the current route
    selectFragment, // select the current route fragment
    selectQueryParams, // select the current route query params
    selectQueryParam, // factory function to select a query param
    selectRouteParams, // select the current route params
    selectRouteParam, // factory function to select a route param
    selectRouteData, // select the current route data
    selectUrl, // select the current url
} = fromRouter.getSelectors(getRouterFeature);
