import { Component } from '@angular/core';
import { SimpleNavComponent } from './common/components';

@Component({
    selector: 'app-root',
    imports: [SimpleNavComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'simple-english-language';
}
