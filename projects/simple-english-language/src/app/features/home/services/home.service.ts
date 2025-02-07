import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ThesaurusResponse, TranslationResponse } from '../../../common/interfaces';
import { DictionaryService } from '../../../common/services';
import { ThesaurusService } from '../../thesaurus/services/thesaurus.service';
import { DEFAULT_PAGE_SIZE } from '../constants';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    private router = inject(Router);
    private dictionaryService = inject(DictionaryService);
    private thesaurusService = inject(ThesaurusService);

    pageSize = signal(DEFAULT_PAGE_SIZE);

    allThesaurusEntries = signal<ThesaurusResponse[]>([]);
    allSpanishTranslations: TranslationResponse[] = [];

    async initialize(): Promise<void> {
        await this.loadDefinitions();
        this.allSpanishTranslations = await this.dictionaryService.getAllSpanishTranslations();
    }

    private async loadDefinitions(reset: boolean = false) {
        const currentPageSize = this.pageSize();
        if (this.allThesaurusEntries().length >= currentPageSize && !reset) return;

        const thesaurusEntries = await this.dictionaryService.getAllThesaurusEntries();

        let count = 0;
        const uniqueEntries: ThesaurusResponse[] = [];
        for (const entry of thesaurusEntries.reverse()) {
            if (count === currentPageSize) break;
            if (uniqueEntries.filter(t => t.id === entry.id).length > 0) continue;
            uniqueEntries.push(entry);
            count++;
        }

        this.allThesaurusEntries.set(uniqueEntries);
    }

    async onWordClick(word: ThesaurusResponse) {
        await this.thesaurusService.onWordClick(word.id);
        this.router.navigate(['thesaurus']);
    }

    async onClickMoreDefinitions() {
        const currentPageSize = this.pageSize();
        this.pageSize.set(currentPageSize + 20);
        await this.loadDefinitions();
    }

    async onResetPageSize() {
        this.pageSize.set(DEFAULT_PAGE_SIZE);
        const reset = true;
        await this.loadDefinitions(reset);
    }
}
