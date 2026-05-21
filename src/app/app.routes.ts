import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./quote-card/feature/quote-container.component').then(
        (m) => m.QuoteContainerComponent
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
