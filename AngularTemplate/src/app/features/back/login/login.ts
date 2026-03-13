import {Component, inject} from '@angular/core';
import {AuthService} from "../../../core/services/auth/auth-service";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {Router} from "@angular/router";

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
        const data = this.formLogin.value;
        this.authService.login(data).subscribe({
            next: response => {
                console.log(response);

                this.router.navigate(['/backoffice/home']);
            },
            error: error => {
                console.log(error)
            }
        })

    }

}
