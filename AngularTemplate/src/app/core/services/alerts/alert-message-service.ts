import {Injectable, signal} from '@angular/core';
import {AlertMessageInterface} from "../../interfaces/popups/AlertMessageInterface";

@Injectable({
    providedIn: 'root',
})
export class AlertMessageService {
    public show = signal<boolean>(false)
    public config = signal<AlertMessageInterface>({
        eventPrimary: '',
        eventSecondary: '',
        btn_secondary: true,
        icon: '',
        title: '',
        message: '',
        color_primary: '',
        color_secondary: '',
        text_btn_primary: '',
        text_btn_secondary: '',
    })


    notify(
        eventPrimary: () => void = () => {},
        eventSecondary: () => void = () => {},
        btn_secondary:boolean = true,
        icon:string = 'fa-solid fa-check',
        title:string= '¡Felicidades!',
        message:string = 'Este sera el mensaje que salga para el usuario tenga idea de lo que le acaban de comunicar',
        color_primary:string= 'success',
        text_btn_primary:string= 'Aceptar',
        color_secondary:string= 'danger',
        text_btn_secondary:string='Cancelar',
    ) {
        const config: AlertMessageInterface = {
            eventPrimary:eventPrimary, eventSecondary:eventSecondary, btn_secondary:btn_secondary, icon:icon,
            title:title, message:message, color_primary:color_primary, color_secondary:color_secondary,
            text_btn_primary:text_btn_primary, text_btn_secondary:text_btn_secondary,
        }
        this.config.set(config);
        this.show.set(true)
    }

    close() {
        this.show.set(false);
    }

}
