import { Injectable } from '@angular/core';
import { ThesaurusResponse, TranslationResponse } from '../../../common/interfaces';
import { DictionaryService } from '../../../common/services';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    allThesaurusEntries: ThesaurusResponse[] = [];
    allSpanishTranslations: TranslationResponse[] = [];

    constructor(private dictionaryService: DictionaryService) {}

    async initialize(): Promise<void> {
        // this.allThesaurusEntries = await this.dictionaryService.getAllThesaurusEntries();
        const thesaurusEntries = await this.dictionaryService.getAllThesaurusEntries();
        for (const entry of thesaurusEntries) {
            if (this.allThesaurusEntries.filter(t => t.id === entry.id).length > 0) continue;
            this.allThesaurusEntries.push(entry);
        }
        this.allSpanishTranslations = await this.dictionaryService.getAllSpanishTranslations();
    }

    onWordClick(word: ThesaurusResponse) {
        console.log(word);
    }
}
