import { AfterContentChecked, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '@app/store/models/article.model';
import { Store } from '@ngrx/store';
import * as actions from '../../store/actions';
import { MarkdownComponent } from 'ngx-markdown';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-article-component',
  templateUrl: './article-component.component.html',
  styleUrls: ['./article-component.component.scss']
})
export class ArticleComponentComponent implements OnInit, AfterContentChecked {
  @ViewChild('content') content: MarkdownComponent | null = null;
  @Input() article: Article | null = null;
  @Input() full = false;

  private readmore = '--readmore--';
  private modifyingContent = false;

  constructor(private router: Router, private store: Store, @Inject(DOCUMENT) private document: any) { }

  ngAfterContentChecked(): void {
    if (this.modifyingContent) {
      return;
    }

    try
    {
      const nativeElement = this.content?.element?.nativeElement;
      if (nativeElement) {
        this.modifyingContent = true;
        const links = nativeElement.getElementsByTagName('a');
        const hostname = this.document?.location?.hostname;
        Array.prototype.forEach.apply(links, [function(link: HTMLAnchorElement) {
          if (link.hostname != hostname && 
            ['http:', 'https:'].includes(link.protocol) &&
            !link.target) {
            link.setAttribute('target', '_blank');
          }
        }]);
      }
    }
    finally
    {
      this.modifyingContent = false;
    }
  }

  ngOnInit(): void {
    this.store.dispatch(actions.loadContent());
  }

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
