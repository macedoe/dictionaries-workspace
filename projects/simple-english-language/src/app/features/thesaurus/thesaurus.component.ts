import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ThesaurusService } from './services/thesaurus.service';

@Component({
    selector: 'app-thesaurus',
    imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule],
    templateUrl: './thesaurus.component.html',
    styleUrl: './thesaurus.component.scss'
})
export class ThesaurusComponent {
    public thesaurusService = inject(ThesaurusService);
}
