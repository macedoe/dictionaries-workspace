import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    isDarkTheme = signal(false);
    theme = signal('light');

    loadTheme() {
        const savedTheme = localStorage.getItem('simple-dictionary-theme');
        if (savedTheme) {
            this.theme.set(savedTheme);
            this.isDarkTheme.set(this.theme() === 'dark');
        }
    }

    toggleTheme(theme: 'light' | 'dark') {
        this.theme.set(theme);
        this.isDarkTheme.set(theme === 'dark');
        localStorage.setItem('simple-dictionary-theme', theme);
    }
}
