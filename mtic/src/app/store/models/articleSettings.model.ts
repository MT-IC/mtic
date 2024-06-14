export class ArticleSettings {
    showTitle = true;
    hidden = false;
    browsable = true;
    externalContent: null | 'markup' = null;
    categoryIndexes: { [category: string]: number } = {};
    previousButtonText: string | null = null;
    nextButtonText: string | null = null;

    constructor(value?: any) {
        this.showTitle = value?.showTitle === undefined ? true : value.showTitle;
        this.hidden = value?.hidden === undefined ? false : value.hidden;
        this.browsable = value?.browsable === undefined ? true : value.browsable;
        this.externalContent = value?.externalContent || null;
        this.categoryIndexes = value?.categoryIndexes || {};
        this.previousButtonText = value?.previousButtonText;
        this.nextButtonText = value?.nextButtonText;
    }
}
