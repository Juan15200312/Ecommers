import {inject, Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
    providedIn: 'root',
})
export class CookieAuthService {
    private cookieService = inject(CookieService);

    set(key: string, value: string, days: number): void {
        this.cookieService.set(
            key,
            value,
            days,
            "/",
            undefined,
            false,
            "Strict"
        );
    }


    get(key: string) {
        return this.cookieService.get(key)
    }


    remove(key: string) {
        this.cookieService.delete(key, '/')
    }


    exists(key: string): boolean {
        return this.cookieService.check(key)
    }


    removeAll(): void {
        this.cookieService.deleteAll('/');
    }
}
