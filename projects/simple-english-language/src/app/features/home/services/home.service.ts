import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ThesaurusResponse, TranslationResponse } from '../../../common/interfaces';
import { DictionaryService } from '../../../common/services';
import { ThesaurusService } from '../../thesaurus/services/thesaurus.service';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    allThesaurusEntries: ThesaurusResponse[] = [];
    allSpanishTranslations: TranslationResponse[] = [];

    constructor(
        private router: Router,
        private dictionaryService: DictionaryService,
        private thesaurusService: ThesaurusService
    ) {}

    async initialize(): Promise<void> {
        const thesaurusEntries = await this.dictionaryService.getAllThesaurusEntries();
        for (const entry of thesaurusEntries) {
            if (this.allThesaurusEntries.filter(t => t.id === entry.id).length > 0) continue;
            this.allThesaurusEntries.unshift(entry);
        }
        this.allSpanishTranslations = await this.dictionaryService.getAllSpanishTranslations();
    }

    async onWordClick(word: ThesaurusResponse) {
        await this.thesaurusService.onWordClick(word.id);
        this.router.navigate(['thesaurus']);
    }
}
