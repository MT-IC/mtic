import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from './store/models/content.model';

@Injectable({
    providedIn: 'root'
})
export class Service {
    constructor(private httpClient: HttpClient) {}

    loadContent(): Observable<Content> {
        return this.httpClient.get<Content>('/assets/content/content/nl.json');
    }
}
