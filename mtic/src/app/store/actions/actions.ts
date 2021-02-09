import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Article } from '../models/article.model';
import { Content } from '../models/content.model';

export const loadContent = createAction('[Content] Load Content');
export const loadContentSuccess = createAction('[Content] Load Content Success', props<{ content: Content }>());
export const loadContentFailure = createAction('[Content] Load Content Failure', props<{ error: HttpErrorResponse }>());

export const loadArticle = createAction('[Content] Load Article', props<{articleId: number}>());
export const loadArticleSuccess = createAction('[Content] Load Article Success', props<{ article: Article }>());
export const loadArticleFailure = createAction('[Content] Load Article Failure', props<{ error: HttpErrorResponse }>());
