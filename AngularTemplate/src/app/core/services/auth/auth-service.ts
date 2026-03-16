import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LoginSendInterface} from "../../interfaces/back/loginSendInterface";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url_api = environment.url_api;
  private httpClient = inject(HttpClient);


  login(data:LoginSendInterface){
    return this.httpClient.post<any>(`${this.url_api}/login/`, data)
  }



}
