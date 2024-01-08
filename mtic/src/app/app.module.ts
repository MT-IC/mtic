import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { ArticlesComponent } from './articles/articles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterBarComponent } from './_partials/footer-bar/footer-bar.component';
import { HeaderBarComponent } from './_partials/header-bar/header-bar.component';
import { MarkdownModule } from 'ngx-markdown';
import { reducer } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ArticleComponent } from './article/article.component';
import { ArticleComponentComponent } from './_partials/article-component/article-component.component';
import { FEATURE } from './store/selectors';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@src/environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import * as fromRouter from './store/route';
import { SearchComponent } from './search/search.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { InterceptRouterlinkDirective } from './_directives/interceptRouterLink.directive';

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
    InterceptRouterlinkDirective,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
