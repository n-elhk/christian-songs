import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(({ HomePage }) => HomePage),
  },
  {
    path: 'song/:name',
    loadComponent: () =>
      import('./song/song.page').then(({ SongPage }) => SongPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
