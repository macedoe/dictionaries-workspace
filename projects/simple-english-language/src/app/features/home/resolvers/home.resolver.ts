import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HomeService } from '../services/home.service';

export const homeResolver: ResolveFn<boolean> = () => {
    const homeService = inject(HomeService);
    homeService.initialize();
    return true;
};
