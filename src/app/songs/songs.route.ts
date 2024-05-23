export default [
  {
    path: '',
    loadComponent: () =>
      import('./songs.page').then(({ SongsPage }) => SongsPage),
  },
  {
    path: ':name',
    loadComponent: () =>
      import('./lyric/lyric.page').then(({ LyricPage }) => LyricPage),
  },
];
