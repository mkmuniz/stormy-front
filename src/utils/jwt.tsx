
import * as jwt from 'jsonwebtoken';
import { buscarCookie } from '../context/cookie';
import { tratarErroJWT } from './erro';
import { COOKIE_TYPES, ERRO_TYPES } from './types';
const { verify } = jwt;

const JWT_SECRET = process.env.REACT_APP_JWT_SECRET || undefined;

/**
 * @param {string} token 
 */
export const validarToken = (token: any) => {
    if (!JWT_SECRET) {
        return ERRO_TYPES.JWT_NAO_DEFINIDA;
    }

    try {
        return verify(token, JWT_SECRET);
    } catch (erro) {
        return tratarErroJWT(erro);
    }
}

export const validarLogin = () => {
    const token = buscarCookie(COOKIE_TYPES.USUARIO);
    const valid =  validarToken(token);
    return valid;
}