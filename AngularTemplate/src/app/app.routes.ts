import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'backoffice/login',
      pathMatch: 'full',
    },

    // Back office
    {
        path: 'backoffice/login',
        loadComponent:() => import('./features/back/login/login').then((c) => c.Login),

    },
    {
        path: 'backoffice',
        loadComponent: () => import('./layouts/main-layout-back/main-layout-back').then((c) => c.MainLayoutBack),
        children: [
            {
                path: 'home',
                loadComponent: () => import('./features/back/dashboard/dashboard').then((c) => c.Dashboard),

            }
        ]
    }

    // Cliente

];
