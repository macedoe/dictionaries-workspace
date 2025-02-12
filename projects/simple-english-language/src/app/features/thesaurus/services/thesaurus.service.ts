import { inject, Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThesaurusResponse } from '../../../common/interfaces';
import { DictionaryService } from '../../../common/services';

@Injectable({
    providedIn: 'root'
})
export class ThesaurusService {
    private dictionaryService = inject(DictionaryService);
    private formBuilder = inject(FormBuilder);

    searchForm: FormGroup = this.formBuilder.group({
        searchInput: ['', Validators.required]
    });

    thesaurusData = signal<ThesaurusResponse[]>([]);

    clearSearchInput() {
        this.searchForm.get('searchInput')?.setValue('');
    }

    async search() {
        const searchInput = this.searchForm.get('searchInput')?.value;
        const parsedSearchInput = this.parseSearchInput(searchInput);

        const data = await this.dictionaryService.getDictionaryEntry(parsedSearchInput);
        this.thesaurusData.set(data);
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
