import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'mass',
    loadChildren: () => import('./mass/mass.route'),
  },
  {
    path: 'songs',
    loadChildren: () => import('./songs/songs.route'),
  },
  {
    path: '',
    redirectTo: 'mass',
    pathMatch: 'full',
  },
];
