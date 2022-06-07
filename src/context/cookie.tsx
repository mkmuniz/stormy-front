import { Cookies } from "react-cookie";
import { COOKIE_TYPES } from "../utils/types";

export const limparCookies = () => {
    const cookie = new Cookies();
    let nomeCookie: any;
    for (nomeCookie of Object.values(COOKIE_TYPES)) {
        cookie.remove(nomeCookie, { path: '/' })
    }
}

export const buscarCookie = (nomeCookie: any) => {
    const cookie = new Cookies();
    return cookie.get(nomeCookie);
}

export const criarCookie = (nomeCookie: string, dados: any) => {
    const cookie: any = new Cookies();
    return cookie.set(nomeCookie, dados, localStorage.setItem(cookie, 'token'));
}

export const removerCookie = (nomeCookie: any) => {
    const cookie = new Cookies();
    return cookie.remove(nomeCookie);
}