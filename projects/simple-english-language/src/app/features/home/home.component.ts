import { Component } from '@angular/core';
import { HomeService } from './services/home.service';

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    constructor(public homeService: HomeService) {}
}
