import {Component, input, output} from '@angular/core';

@Component({
    selector: 'app-alert-message',
    imports: [],
    templateUrl: './alert-message.html',
    styleUrl: './alert-message.scss',
})
export class AlertMessage {
    icon = input<string>('fa-solid fa-check')
    title = input<string>('¡Felicidades!')
    message = input<string>('Este sera el mensaje que salga para el usuario tenga idea de lo que le acaban de comunicar')
    color_primary = input<string>('success')
    color_secondary = input<string>('danger')
    btn_secondary = input<boolean>(true)
    text_btn_primary = input<string>('Aceptar')
    text_btn_secondary = input<string>('Cancelar')
    eventPrimary = input<() => void>()
    eventSecondary = input<() => void>()

    runEvent(event: any) {
        const ex = event
        if (ex) {
            ex();
        }
    }


    onClose = output<void>();

    cancelar() {
        this.onClose.emit();
    }


}
