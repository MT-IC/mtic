import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    data: {
      category: 'home',
      activeHeaderButton: 'Home'
    }
  },
  {
    path: 'werkervaringen',
    component: ArticlesComponent,
    data: {
      category: 'werkervaringen',
      activeHeaderButton: 'Werkervaringen'
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
