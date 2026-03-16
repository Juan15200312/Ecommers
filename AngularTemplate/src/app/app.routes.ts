import { Routes } from '@angular/router';
import {authGuard} from "./core/guards/back/auth-guard";

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
        canActivate: [authGuard],
        children: [
            {
                path: 'home',
                loadComponent: () => import('./features/back/dashboard/dashboard').then((c) => c.Dashboard),

            }
        ]
    },

    // Cliente
    {
        path: 'clientes/login',
        loadComponent: () => import('./features/cli/login/login').then((c) => c.Login),
    }

];
