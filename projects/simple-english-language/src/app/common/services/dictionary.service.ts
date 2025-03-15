import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { db } from '../data/db';
import { ThesaurusResponse, TranslationResponse } from '../interfaces';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root'
})
export class DictionaryService {
    private http = inject(HttpClient);
    private alertService = inject(AlertService);

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

    private apiGet<T>(urlSegment: string): Observable<T> {
        try {
            return this.http.get<T>(`${this.apiUrl}${urlSegment}`);
        } catch (error) {
            console.error('Error fetching data:', error);
            return new Observable<T>();
        }
    }

    async getAllThesaurusEntries(limit: number = 0): Promise<ThesaurusResponse[]> {
        if (limit === 0) {
            return await db.words.toArray();
        } else {
            return (await db.words.toArray()).slice(0, limit);
        }
    }

    async getAllSpanishTranslations(): Promise<TranslationResponse[]> {
        return await db.translations.toArray();
    }

    async getAllDictionaryEntries(limit: number = 0): Promise<ThesaurusResponse[]> {
        if (limit === 0) {
            return await db.dictionary.toArray();
        } else {
            return (await db.dictionary.toArray()).slice(0, limit);
        }
    }

    async getThesaurusEntry(word: string): Promise<ThesaurusResponse[]> {
        const thesaurusEntries = (await db.words.filter(w => w.id.includes(word)).toArray()) as ThesaurusResponse[] | [];
        if (thesaurusEntries.length || 0 > 0) {
            return thesaurusEntries;
        }
        const thesaurusResponse = await lastValueFrom(this.apiGet<ThesaurusResponse[]>(`thesaurus/${word}`));
        await db.words.bulkAdd(thesaurusResponse);
        return thesaurusResponse;
    }

    async getSpanishTranslation(word: string): Promise<TranslationResponse[]> {
        const translations = (await db.translations.filter(t => t.id === word).toArray()) as TranslationResponse[] | [];
        if (translations.length > 0) {
            return translations;
        }
        const translationResponse = await lastValueFrom(this.apiGet<TranslationResponse[]>(`spanish/${word}`));
        await db.translations.bulkAdd(translationResponse);
        return translationResponse;
    }

    async getDictionaryEntry(word: string): Promise<ThesaurusResponse[]> {
        const dictionary = (await db.dictionary.filter(d => d.id === word).toArray()) as ThesaurusResponse[] | [];
        if (dictionary.length > 0) {
            return dictionary;
        }
        const dictionaryResponse = await lastValueFrom(this.apiGet<ThesaurusResponse[]>(`dictionary/${word}`));
        if (!Array.isArray(dictionaryResponse) || dictionaryResponse.length === 0) {
            this.alertService.show('No dictionary entry found');
            return [];
        }
        await db.dictionary.bulkAdd(dictionaryResponse);
        return dictionaryResponse;
    }
}
