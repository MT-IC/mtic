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
      activeHeaderButton: 'home'
    }
  },
  {
    path: 'experience',
    component: ArticlesComponent,
    data: {
      category: 'experience',
      activeHeaderButton: 'experience'
    }
  },
  {
    path: 'search',
    component: SearchComponent,
    data: {
      activeHeaderButton: 'search'
    }
  },
  {
    path: 'article/:articleId',
    component: ArticleComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
