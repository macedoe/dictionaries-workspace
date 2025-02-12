import Dexie, { Table } from 'dexie';
import { ThesaurusResponse, TranslationResponse } from '../interfaces';

export class SimpleLanguageDatabase extends Dexie {
    words!: Table<ThesaurusResponse, string>;
    translations!: Table<TranslationResponse, string>;
    dictionary!: Table<ThesaurusResponse, string>;

    constructor() {
        super('SimpleLanguageDatabase');
        this.version(2).stores({
            words: '++itmId,id',
            translations: '++itmId,id',
            dictionary: '++itmId,id'
        });
    }
}

export const db = new SimpleLanguageDatabase();
