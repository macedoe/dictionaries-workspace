import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExternalResponseSpanish, ExternalResponseThesaurus, InternalResponseSpanish, InternalResponseThesaurus } from './interfaces';

@Injectable()
export class AppService {
    constructor(private readonly configService: ConfigService) {}

    async getThesaurusEntry(word: string): Promise<InternalResponseThesaurus[]> {
        const data = await this.getExternalThesaurusEntry(word);

        const response: InternalResponseThesaurus[] = [];
        for (const entry of data) {
            response.push({
                id: entry.meta.id,
                definitions: entry.shortdef,
                synonyms: entry.meta.syns.flat(),
                antonyms: entry.meta.ants.flat(),
                partOfSpeech: entry.fl
            });
        }

        return response;
    }

    async getSpanishDefinition(word: string): Promise<InternalResponseSpanish[]> {
        const data = await this.getExternalSpanishEntry(word);

        const response: InternalResponseSpanish[] = [];
        for (const entry of data) {
            response.push({
                id: entry.meta.id,
                definitions: entry.shortdef,
                partOfSpeech: entry.fl
            });
        }

        return response;
    }

    private async getExternalSpanishEntry(word: string): Promise<ExternalResponseSpanish[]> {
        const response = await fetch(`${this.apiUrl}spanish/json/${word}?key=${this.apiKeySpanish}`);
        if (!response.ok) {
            throw new Error(`Unable to fetch spanish data for ${word}`);
        }

        const data = (await response.json()) as ExternalResponseSpanish[];

        return data;
    }

    private async getExternalThesaurusEntry(word: string): Promise<ExternalResponseThesaurus[]> {
        const response = await fetch(`${this.apiUrl}thesaurus/json/${word}?key=${this.apiKeyThesaurus}`);
        if (!response.ok) {
            throw new Error(`Unable to fetch thesaurus data for ${word}`);
        }

        const data = (await response.json()) as ExternalResponseThesaurus[];

        return data;
    }

    private get apiKeyThesaurus(): string {
        return this.getApiKey('thesaurus') || '';
    }

    private get apiKeySpanish(): string {
        return this.getApiKey('spanish') || '';
    }

    private get apiUrl(): string {
        return this.configService.get<string>('API_URL') || '';
    }

    private getApiKey(type: 'thesaurus' | 'spanish') {
        return this.configService.get<string>(`API_KEY_${type.toUpperCase()}`);
    }
}
