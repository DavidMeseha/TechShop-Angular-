import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register-page/register-page.component').then(
        (m) => m.RegisterPageComponent
      ),
  },
];
