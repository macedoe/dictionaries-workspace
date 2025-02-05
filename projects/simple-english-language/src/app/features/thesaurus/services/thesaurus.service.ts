import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThesaurusResponse } from '../../../common/interfaces';
import { DictionaryService } from '../../../common/services';

@Injectable({
    providedIn: 'root'
})
export class ThesaurusService {
    searchForm: FormGroup;
    thesaurusData: ThesaurusResponse[] = [];

    constructor(
        formBuilder: FormBuilder,
        private dictionaryService: DictionaryService
    ) {
        this.searchForm = formBuilder.group({
            searchInput: ['', Validators.required]
        });
    }

    clearSearchInput() {
        this.searchForm.get('searchInput')?.setValue('');
    }

    async search() {
        const searchInput = this.searchForm.get('searchInput')?.value;
        const parsedSearchInput = this.parseSearchInput(searchInput);

        const data = await this.dictionaryService.getThesaurusEntry(parsedSearchInput);
        this.thesaurusData = data;
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
