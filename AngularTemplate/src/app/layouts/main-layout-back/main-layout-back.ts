import {Component, inject} from '@angular/core';
import {Header} from "./components/header/header";
import {Sidebar} from "./components/sidebar/sidebar";
import {RouterOutlet} from "@angular/router";
import {LayoutService} from "./layautService";

@Component({
  selector: 'app-main-layout-back',
    imports: [
        Header,
        Sidebar,
        RouterOutlet
    ],
  templateUrl: './main-layout-back.html',
  styleUrl: './main-layout-back.scss',
})
export class MainLayoutBack {
    layoutService = inject(LayoutService);

}
