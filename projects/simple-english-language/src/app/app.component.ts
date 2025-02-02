import { Component, OnInit } from '@angular/core';
import { SimpleNavComponent } from './common/components';
import { ThemeService } from './common/services';

@Component({
    selector: 'app-root',
    imports: [SimpleNavComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    constructor(private themeService: ThemeService) {}

    ngOnInit(): void {
        this.themeService.loadTheme();
    }
}
