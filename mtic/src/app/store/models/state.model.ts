import { Content as SiteContent } from './content.model';

export class State {
    language = 'nl';
    activeHeaderButton: string | null = null;
    loading = false;
    loaded: Date | undefined = undefined;
    content: SiteContent | null = null;
}
