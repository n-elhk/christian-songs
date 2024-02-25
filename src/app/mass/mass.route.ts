export default [
  {
    path: '',
    loadComponent: () =>
      import('./mass.page').then(({ MassPage }) => MassPage),
  },
  {
    path: 'lectures',
    loadComponent: () =>
      import('./reading/reading.page').then(({ ReadingPage }) => ReadingPage),
  },
];
