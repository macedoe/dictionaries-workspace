import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DEFAULT_PAGE_SIZE } from './constants';
import { HomeService } from './services/home.service';

@Component({
    selector: 'app-home',
    imports: [MatButtonModule, MatInputModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    DEFAULT_PAGE_SIZE = DEFAULT_PAGE_SIZE;
    public homeService = inject(HomeService);
}
