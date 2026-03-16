import {Component, inject, signal} from '@angular/core';
import {LayoutService} from "../../layautService";

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  layoutService = inject(LayoutService);

}
