import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {Location} from '@angular/common';
import {AlertMessageService} from "../../services/alerts/alert-message-service";
import {CookieAuthService} from "../../services/cookies/cookie-auth-service";
import {SessionService} from "../../services/session/session-service";

export const authGuard: CanActivateFn = (route, state) => {
    const alertMessageService = inject(AlertMessageService);
    const router = inject(Router)
    const location = inject(Location)
    const cookieService = inject(CookieAuthService)
    const sessionService = inject(SessionService)
    const token = cookieService.get('token')
    const refresh = cookieService.get('refresh')
    const userStr = sessionService.get('user_part')
    const user = userStr ? JSON.parse(userStr) : null;

    if (state.url.startsWith('/backoffice')) {
        if ((refresh || token) && user){
            if (user.role === 'ADMIN') {
                return true
            }else {
                router.navigate(['/clientes/login'])
                return false
            }
        }

        alertMessageService.notify(
            ()=> {
                router.navigate(['/backoffice/login'], {queryParams: {returnUrl : state.url} });
                alertMessageService.close()
            },
            () => {
                alertMessageService.close()
                location.back()
            },
            true,
            'fa-solid fa-triangle-exclamation',
            '¡Acceso restringido!',
            '¡Ups! Parece que no has iniciado sesión. Ingresa a tu cuenta para ver este contenido.',
            'warning',
            'Iniciar sesion'
        )
        return false
    }
    return true;
};
