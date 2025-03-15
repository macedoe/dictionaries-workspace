import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { TranslationService } from './services/translation.service';

@Component({
    selector: 'app-translation',
    imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule],
    templateUrl: './translation.component.html',
    styleUrl: './translation.component.scss'
})
export class TranslationComponent {
    public translationService = inject(TranslationService);
}
