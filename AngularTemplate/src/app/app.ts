import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AlertMessageService} from "./core/services/alerts/alert-message-service";
import {AlertMessage} from "./shared/components/popups/alert-message/alert-message";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertMessage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('E-Commerce');

  protected alertMessageService = inject(AlertMessageService);
}
