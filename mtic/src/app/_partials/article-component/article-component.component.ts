import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/store/models/article.model';

@Component({
  selector: 'app-article-component',
  templateUrl: './article-component.component.html',
  styleUrls: ['./article-component.component.scss']
})
export class ArticleComponentComponent {
  @Input() article: Article | null = null;
  @Input() full = false;

  private readmore = '--readmore--';

  constructor(private router: Router) { }

  getArticleClass(): string {
    return `${this.article?.class} ${this.full ? 'full' : ''}`.trim();
  }

  getContent(): string {
    const content = this.article?.content;
    if (!content) {
      return '';
    }

    const readmorePos = content.indexOf(this.readmore);
    if (readmorePos === -1) {
      return content;
    }

    return this.full ? content.replace(this.readmore, '') : content.substring(0, readmorePos);
  }

  hasReadMore(): boolean {
    const content = this.article?.content;
    if (!content) {
      return false;
    }
    return content.indexOf(this.readmore) >= 0;
  }

  showTitle(): boolean {
    const setting = this.article?.settings?.showTitle;
    return setting === undefined ? true : setting;
  }

  readMore(): void {
    this.router.navigate(['article', this.article?.id]);
  }
}
