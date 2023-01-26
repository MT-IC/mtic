import { Content as SiteContent } from './content.model';

export class State {
    language = 'nl';
    activeHeaderButton: string | null = null;
    loading = false;
    loaded = false;
    content: SiteContent | null = null;
}
