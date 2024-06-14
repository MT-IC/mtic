import { AfterContentChecked, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Article } from '@app/store/models/article.model';
import { Store } from '@ngrx/store';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';
import { MarkdownComponent } from 'ngx-markdown';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, map, of, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-article-component',
  templateUrl: './article-component.component.html',
  styleUrls: ['./article-component.component.scss']
})
export class ArticleComponentComponent implements OnInit, AfterContentChecked {
  @ViewChild('contentEl') contentEl: MarkdownComponent | null = null;
  @Input() article: Article | null = null;
  @Input() full = false;

  content$: Observable<string> | null = null;

  private readmore = '--readmore--';
  private modifyingContent = false;

  constructor(
    private httpClient: HttpClient,
    private store: Store, 
    @Inject(DOCUMENT) private document: any) { }

  ngAfterContentChecked(): void {
    if (this.modifyingContent) {
      return;
    }

    try
    {
      const nativeElement = this.contentEl?.element?.nativeElement;
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

    let articleId = '';
    this.content$ = this.full
      ? this.store.select(selectors.getRouterArticle).pipe(
          filter(Boolean),
          filter(a => a.id !== articleId),
          switchMap(a => {
            articleId = a.id;
            if (!a.content) {
              return of('');
            }

            switch (a.settings?.externalContent) {
              case 'markup':
                return this.httpClient.request('GET', a.content, { responseType: 'text' });
            }
        
            const readmorePos = a.content.indexOf(this.readmore);
            if (readmorePos === -1) {
              return of(a.content);
            }
    
            return of(a.content.replace(this.readmore, ''));
          })
        )
      : of(this.article).pipe(
          filter(Boolean),
          take(1),
          map(a => {
            if (!a.content) {
              return '';
            }

            const readmorePos = a.content.indexOf(this.readmore);
            if (readmorePos === -1) {
              return a.content;
            }
    
            return a.content.substring(0, readmorePos);
          }));
  }

  getArticleClass(): string {
    return `${this.article?.class} ${this.full ? 'full' : ''}`.trim();
  }

  get hasReadMore(): boolean {
    const content = this.article?.content;
    if (!content) {
      return false;
    }
    return content.indexOf(this.readmore) >= 0;
  }

  get showTitle(): boolean {
    const setting = this.article?.settings?.showTitle;
    return setting === undefined ? true : setting;
  }
}
