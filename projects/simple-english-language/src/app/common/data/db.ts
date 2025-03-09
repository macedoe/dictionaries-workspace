import Dexie, { Table } from 'dexie';
import { DictionaryEntry, ThesaurusResponse, TranslationResponse } from '../interfaces';

export class SimpleLanguageDatabase extends Dexie {
    words!: Table<ThesaurusResponse, string>;
    translations!: Table<TranslationResponse, string>;
    dictionary!: Table<ThesaurusResponse, string>;
    freeDictionary!: Table<DictionaryEntry, string>;

    constructor() {
        super('SimpleLanguageDatabase');
        this.version(3).stores({
            words: '++itmId,id',
            translations: '++itmId,id',
            dictionary: '++itmId,id',
            freeDictionary: '++itmId,word'
        });
    }
}

export const db = new SimpleLanguageDatabase();
