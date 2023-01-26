import { createAction, props } from '@ngrx/store';
import { Article } from './models/article.model';
import { Content } from './models/content.model';

export const loadContent = createAction('[Content] Load Content');
export const loadContentNotNecessary = createAction('[Content] Load Content Not Necessary');
export const loadContentSuccess = createAction('[Content] Load Content Success', props<{ content: Content }>());
export const loadContentFailure = createAction('[Content] Load Content Failure', props<{ error: any }>());

export const menuItemSelected = createAction('[Navigation] Menu Item Selected', props<{ name: string }>());
export const menuItemSelectionDone = createAction('[Navigation] Menu Item Selection Done');

export const search = createAction('[Search] Search text changed', props<{ search: string }>());
export const searchResult = createAction('[Search] Search result', props<{ articles: Article[] }>());
