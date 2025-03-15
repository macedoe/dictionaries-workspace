import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services';
import { SidebarService } from '../../services/sidebar.service';

@UntilDestroy()
@Component({
    selector: 'app-simple-nav',
    templateUrl: './simple-nav.component.html',
    styleUrl: './simple-nav.component.scss',
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        AsyncPipe
    ]
})
export class SimpleNavComponent implements OnInit {
    private themeService = inject(ThemeService);
    private sidebarService = inject(SidebarService);

    @ViewChild('drawer') drawer!: MatSidenav;

    title = 'Simple Language App';

    get isDarkTheme(): boolean {
        return this.themeService.isDarkTheme();
    }

    isHandset$: Observable<boolean> = this.sidebarService.isHandset$;

    ngOnInit(): void {
        this.sidebarService.toggleSidebar$.pipe(untilDestroyed(this)).subscribe(() => {
            this.isHandset$.pipe(untilDestroyed(this)).subscribe(isHandset => {
                if (isHandset) {
                    this.drawer.toggle();
                }
            });
        });
    }

    toggleSidebar(): void {
        this.isHandset$.pipe(untilDestroyed(this)).subscribe(isHandset => {
            if (isHandset) {
                this.drawer.toggle();
            }
        });
    }

    closeSidebar(): void {
        this.isHandset$.pipe(untilDestroyed(this)).subscribe(isHandset => {
            if (isHandset) {
                this.drawer.close();
            }
        });
    }
}
