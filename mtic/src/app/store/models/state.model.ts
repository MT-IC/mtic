import { Content } from "@angular/compiler/src/render3/r3_ast";

import { Content as SiteContent } from './content.model';

export class State {
    language = 'nl';
    loading = false;
    loaded = false;
    content: SiteContent | null = null;
}
