import Dexie, { Table } from 'dexie';
import { ThesaurusResponse, TranslationResponse } from '../interfaces';

export class SimpleLanguageDatabase extends Dexie {
    words!: Table<ThesaurusResponse, string>;
    translations!: Table<TranslationResponse, string>;

    constructor() {
        super('SimpleLanguageDatabase');
        this.version(1).stores({
            words: '++itmId,id',
            translations: '++itmId,id'
        });
    }
}

export const db = new SimpleLanguageDatabase();
