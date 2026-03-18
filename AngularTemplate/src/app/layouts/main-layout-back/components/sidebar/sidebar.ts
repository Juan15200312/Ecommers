import {Component, inject, signal} from '@angular/core';
import {LayoutService} from "../../layautService";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  layoutService = inject(LayoutService);

}
