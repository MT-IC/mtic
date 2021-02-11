import { ArticleSettings } from "./articleSettings.model";

export class Article {
    id!: string;
    title!: string;
    content = '';
    class: string | null = null;
    tags: string[] = [];
    settings: ArticleSettings = new ArticleSettings();
}
