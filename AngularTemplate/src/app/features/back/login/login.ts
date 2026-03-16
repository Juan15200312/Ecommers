import {Component, inject} from '@angular/core';
import {AuthService} from "../../../core/services/auth/auth-service";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertMessageService} from "../../../core/services/alerts/alert-message-service";
import {LoginSendInterface} from "../../../core/interfaces/back/loginSendInterface";
import {LoginResponseInterface} from "../../../core/interfaces/back/loginResponseInterface";
import {UserPartInterface} from "../../../core/interfaces/back/userPartInterface";
import {CookieAuthService} from "../../../core/services/cookies/cookie-auth-service";
import {SessionService} from "../../../core/services/session/session-service";

@Component({
    selector: 'app-login',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgClass
    ],
    templateUrl: './login.html',
    styleUrl: './login.scss',
})
export class Login {
    private authService = inject(AuthService)
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private cookieService = inject(CookieAuthService)
    private sessionService = inject(SessionService)
    private alertMessageService = inject(AlertMessageService);

    protected formLogin = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
    })

    isFieldInvalid(field: string): boolean {
        const control = this.formLogin.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }

    login() {
        if (this.formLogin.invalid){
            console.log('Formulario invalido')
            return
        }
        const data:LoginSendInterface = this.formLogin.value as LoginSendInterface;
        this.authService.login(data).subscribe({
            next: response => {
                console.log(response);
                const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/backoffice/home';

                const data:LoginResponseInterface = response;
                const user:UserPartInterface = data.user_part

                if (user.role !== 'ADMIN') {
                    this.alertMessageService.notify(
                        () => {
                            this.alertMessageService.close()
                        },
                        () => {},
                        false,
                        'fa-solid fa-ban',
                        'Acceso denegado',
                        'Esta área es solo para administradores. Serás redirigido al área de clientes.',
                        'warning',
                        'Entendido'
                    );
                    this.router.navigate(['/clientes/login']);
                    return;
                }

                this.cookieService.set('token', data.token, 0.125)
                this.cookieService.set('refresh', data.refresh, 1)
                this.sessionService.set('user_part', JSON.stringify(user))

                this.alertMessageService.notify(
                    ()=> {
                        this.alertMessageService.close()
                    },
                    () => {},
                    false,
                    'fa-solid fa-check',
                    '¡Sesion iniciada!',
                    response.message,
                    'success',
                    'Aceptar',
                )

                this.router.navigate([returnUrl]);
            },
            error: error => {
                console.log(error)
                this.alertMessageService.notify(
                    ()=> {
                        console.log("error");
                        this.alertMessageService.close()
                    },
                    () => {},
                    false,
                    'fa-solid fa-xmark',
                    '¡Error!',
                    error.error,
                    'danger',
                    'Entendido'
                )
            }
        })

    }



}
