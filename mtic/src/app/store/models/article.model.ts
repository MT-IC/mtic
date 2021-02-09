import { ArticleSettings } from "./articleSettings.model";

export class Article {
    id!: number;
    title!: string;
    content: string | string[] | null = null;
    tags: string[] = [];
    settings: ArticleSettings = new ArticleSettings();

    isRetrieved(): boolean {
        return !!this.content;
    }
}
