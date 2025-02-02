import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ThesaurusResponse, TranslationResponse } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class DictionaryService {
    constructor(private http: HttpClient) {}

    getThesaurusEntry(word: string): Observable<ThesaurusResponse> {
        return this.apiGet<ThesaurusResponse>(`thesaurus/${word}`);
    }

    getSpanishTranslation(word: string): Observable<TranslationResponse> {
        return this.apiGet<TranslationResponse>(`spanish/${word}`);
    }

    private apiGet<T>(urlSegment: string): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${urlSegment}`);
    }

    private get apiUrl(): string {
        let apiUrl = environment.apiUrl;
        if (!apiUrl) {
            throw new Error('API URL is not set');
        }
        if (!apiUrl.endsWith('/')) {
            apiUrl += '/';
        }
        return apiUrl;
    }
}
