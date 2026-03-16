import {UserPartInterface} from "./userPartInterface";


export interface LoginResponseInterface {
    success: boolean;
    message: string;
    token: string;
    refresh: string;
    user_part: UserPartInterface;
}