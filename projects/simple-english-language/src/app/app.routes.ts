import { Routes } from '@angular/router';
import { AboutComponent, HomeComponent, ThesaurusComponent, TranslationComponent } from './features';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        title: 'Home',
        component: HomeComponent
    },
    {
        path: 'about',
        title: 'About',
        component: AboutComponent
    },
    {
        path: 'thesaurus',
        title: 'Dictionary/Thesaurus',
        component: ThesaurusComponent
    },
    {
        path: 'spanish',
        title: 'English/Spanish Dictionary',
        component: TranslationComponent
    }
];
