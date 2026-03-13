import { Component } from '@angular/core';
import {Header} from "./components/header/header";
import {Footer} from "./components/footer/footer";
import {Sidebar} from "./components/sidebar/sidebar";

@Component({
  selector: 'app-main-layout-back',
  imports: [
    Header,
    Footer,
    Sidebar
  ],
  templateUrl: './main-layout-back.html',
  styleUrl: './main-layout-back.scss',
})
export class MainLayoutBack {

}
