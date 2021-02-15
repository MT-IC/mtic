import { ArticleSettings } from './articleSettings.model';
import { getContent } from './_modelHelpers';

export class Article {
    id!: string;
    title!: string;
    content = '';
    class: string | null = null;
    tags: string[] = [];
    settings: ArticleSettings = new ArticleSettings();

    constructor(value?: any) {
        this.id = value?.id;
        this.title = value?.title;
        this.content = getContent(value?.content) || '';
        this.class = value?.class;
        this.tags = value?.tags;
        this.settings = new ArticleSettings(value?.settings);
    }
}
