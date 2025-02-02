import { Injectable, OnInit } from '@angular/core';
import { ThesaurusResponse, TranslationResponse } from '../../../common/interfaces';
import { DictionaryService } from '../../../common/services';

@Injectable({
    providedIn: 'root'
})
export class HomeService implements OnInit {
    allThesaurusEntries: ThesaurusResponse[] = [];
    allSpanishTranslations: TranslationResponse[] = [];

    constructor(private dictionaryService: DictionaryService) {}

    async ngOnInit(): Promise<void> {
        this.allThesaurusEntries = await this.dictionaryService.getAllThesaurusEntries();
        this.allSpanishTranslations = await this.dictionaryService.getAllSpanishTranslations();
    }
}
