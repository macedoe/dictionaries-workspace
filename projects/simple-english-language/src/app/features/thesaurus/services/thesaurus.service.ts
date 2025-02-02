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
        const tooManyTerms = searchInput?.split(' ').length > 1;
        if (!searchInput || tooManyTerms) {
            this.thesaurusData = [];
            if (tooManyTerms) {
                this.searchForm.get('searchInput')?.setErrors({ tooManyTerms: true });
            }
            return;
        }

        const data = await this.dictionaryService.getThesaurusEntry(searchInput);
        this.thesaurusData = data;
    }
}
