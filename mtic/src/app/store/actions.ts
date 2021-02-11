import { createAction, props } from '@ngrx/store';
import { Content } from './models/content.model';

export const loadContent = createAction('[Content] Load Content');
export const loadContentNotNecessary = createAction('[Content] Load Content Not Necessary');
export const loadContentSuccess = createAction('[Content] Load Content Success', props<{ content: Content }>());
export const loadContentFailure = createAction('[Content] Load Content Failure', props<{ error: any }>());
