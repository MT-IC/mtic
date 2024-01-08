import { Article } from './article.model';

export class Content {
    captions: {
        [title: string]: string
    } = { };
    articles: Article[] = [];
}
