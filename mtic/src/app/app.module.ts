import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterBarComponent } from './partials/footer-bar/footer-bar.component';
import { HeaderBarComponent } from './partials/header-bar/header-bar.component';
import { MarkdownModule } from 'ngx-markdown';
import { FEATURE } from './store/selectors';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterBarComponent,
    HeaderBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forFeature(FEATURE, reducer),
    BrowserAnimationsModule,
    MarkdownModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
