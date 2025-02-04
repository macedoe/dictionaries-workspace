import { Routes } from '@angular/router';
import { AboutComponent, HomeComponent, ThesaurusComponent, TranslationComponent } from './features';
import { homeResolver } from './features/home/resolvers/home.resolver';

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
        component: HomeComponent,
        resolve: [homeResolver]
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
