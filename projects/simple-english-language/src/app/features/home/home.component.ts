import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HomeService } from './services/home.service';

@Component({
    selector: 'app-home',
    imports: [MatButtonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    constructor(public homeService: HomeService) {}
}
