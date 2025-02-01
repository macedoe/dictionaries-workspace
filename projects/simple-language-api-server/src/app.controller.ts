import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/thesaurus/:word')
    async getThesaurusEntry(@Param('word') word: string) {
        return await this.appService.getThesaurusEntry(word);
    }

    @Get('/spanish/:word')
    async getSpanishDefinition(@Param('word') word: string) {
        return await this.appService.getSpanishDefinition(word);
    }
}
