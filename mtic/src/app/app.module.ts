import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { ArticlesComponent } from './articles/articles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterBarComponent } from './partials/footer-bar/footer-bar.component';
import { HeaderBarComponent } from './partials/header-bar/header-bar.component';
import { MarkdownModule } from 'ngx-markdown';
import { reducer } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ArticleComponent } from './article/article.component';
import { ArticleComponentComponent } from './partials/article-component/article-component.component';
import { FEATURE } from './store/selectors';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import * as fromRouter from './store/route';
import { SearchComponent } from './search/search.component';

interface ReducerState {
  router: fromRouter.routerReducerState;
}

export const reducers: ActionReducerMap<ReducerState> = {
  router: fromRouter.routerReducer
};

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    FooterBarComponent,
    HeaderBarComponent,
    ArticleComponentComponent,
    ArticleComponent,
    ArticlesComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreModule.forFeature(FEATURE, reducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature(effects),
    BrowserAnimationsModule,
    MarkdownModule.forRoot({}),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
