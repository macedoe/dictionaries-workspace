import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    private toggleSidebarSubject = new Subject<void>();
    toggleSidebar$ = this.toggleSidebarSubject.asObservable();

    isHandset$: Observable<boolean>;

    constructor(breakpointObserver: BreakpointObserver) {
        this.isHandset$ = breakpointObserver.observe(Breakpoints.Handset).pipe(
            map(result => result.matches),
            shareReplay()
        );
    }

    toggleSidebar(): void {
        this.toggleSidebarSubject.next();
    }
}
