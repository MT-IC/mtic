import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    data: {
      category: 'home',
      activeHeaderButton: 'home',
      codeUrl: 'https://github.com/MT-IC/mtic/blob/master/mtic/src/app/articles/articles.component.html'
    }
  },
  {
    path: 'experience',
    component: ArticlesComponent,
    data: {
      category: 'experience',
      activeHeaderButton: 'experience',
      codeUrl: 'https://github.com/MT-IC/mtic/blob/master/mtic/src/app/articles/articles.component.html'
    }
  },
  {
    path: 'search',
    component: SearchComponent,
    data: {
      activeHeaderButton: 'search',
      codeUrl: 'https://github.com/MT-IC/mtic/blob/master/mtic/src/app/search/search.component.ts'
    }
  },
  {
    path: 'article/:articleId',
    component: ArticleComponent,
    data: {
      codeUrl: 'https://github.com/MT-IC/mtic/blob/master/mtic/src/app/article/article.component.html'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
