import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private snackBar: MatSnackBar = inject(MatSnackBar);

    show(message: string, duration: number = 3000): void {
        this.snackBar.open(message, 'Close', {
            duration: duration
        });
    }

    showPersistent(message: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 0
        });
    }
}
