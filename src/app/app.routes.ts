import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/color', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./modules/router/layout.routing').then((m) => m.layoutRoutes),
  },
];
