import { Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { ThemeService } from '../../common/services';

@Component({
    selector: 'app-about',
    imports: [MatButtonToggleModule, MatCardModule],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {
    public themeService = inject(ThemeService);
}
