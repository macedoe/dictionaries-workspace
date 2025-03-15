import { inject, Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslationResponse } from '../../../common/interfaces';
import { DictionaryService } from '../../../common/services';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private dictionaryService = inject(DictionaryService);
    private formBuilder = inject(FormBuilder);
    private htmlParser = inject(DomSanitizer);

    searchForm: FormGroup = this.formBuilder.group({
        searchInput: ['', Validators.required]
    });

    translationData = signal<TranslationResponse[]>([]);

    parseTranslationId(translationId: string) {
        const colonIndex = translationId.indexOf(':');
        if (colonIndex !== -1) {
            return `${translationId.slice(0, colonIndex)}<sup>${translationId.slice(colonIndex + 1)}</sup>`;
        }
        return this.htmlParser.bypassSecurityTrustHtml(translationId);
    }

    clearSearchInput() {
        this.searchForm.get('searchInput')?.setValue('');
    }

    async search() {
        const searchInput = this.searchForm.get('searchInput')?.value;
        const parsedSearchInput = this.parseSearchInput(searchInput);

        const data = await this.dictionaryService.getSpanishTranslation(parsedSearchInput);
        this.translationData.set(data);
    }

    async onWordClick(word: string) {
        this.searchForm.get('searchInput')?.setValue(word);
        await this.search();
    }

    private parseSearchInput(input: string) {
        const wordParts = input.split(' ');
        if (wordParts.length === 1) {
            return input;
        }
        return wordParts.join('-');
    }
}
