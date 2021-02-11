import { Component, Input } from '@angular/core';
import { Article } from 'src/app/store/models/article.model';

@Component({
  selector: 'app-article-component',
  templateUrl: './article-component.component.html',
  styleUrls: ['./article-component.component.scss']
})
export class ArticleComponentComponent {
  @Input() article: Article | null = null;

  showTitle(): boolean {
    const setting = this.article?.settings?.showTitle;
    return setting === undefined ? true : setting;
  }
}
