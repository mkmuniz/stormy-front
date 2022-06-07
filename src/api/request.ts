import api from './request_config';
import { buscarCookie, limparCookies } from '../context/cookie';
import { COOKIE_TYPES, ERRO_TYPES } from '../utils/types';


export const setHeaderAuth = () => {
    const userCookie = buscarCookie(COOKIE_TYPES.USUARIO);
    const authToken = `Bearer ${userCookie}`;
    api.defaults.headers.common.Authorization = authToken;
}

setHeaderAuth();

/**
 * @param {Promise<import('axios').AxiosResponse<any>>} requisicao 
 */
 const tratarRequisicao = async (requisicao: any) => {
    setHeaderAuth()
    return requisicao.then((respostaHttp: any) => {
        if (respostaHttp.status === ERRO_TYPES.JWT_NAO_AUTENTICADO) {
            limparCookies()
        }
        return requisicao;
    })
}

export const get = async (link: string) => {
    return tratarRequisicao(api.get(link));
}

export const getUsername = async (link: string, username: any) => {
    return tratarRequisicao(api.get(link, username)).then((res) => {
        return res.data
    })
}

export const post = async (link: string, body: Object) => {
    return tratarRequisicao(api.post(link, body));
}

export const postAuth = async (link: string, username: string, password: any) => {
    return tratarRequisicao(api.post(link, username, password)).then((res) => {
        return res.data
    })
}

export const postMessage = async (link: string, body: Object) => {
    return tratarRequisicao(api.post(link, body)).then((res) => {
        return res.data
    })
}

export const postResposta = async (link: string, body: Object) => {
    return tratarRequisicao(api.post(link, body)).then((res) => {
        return res.data
    })
}

export const put = async (link: string, body: Object) => {
    return tratarRequisicao(api.put(link, body)).then((res) => {
        return res.data
    })
}
export const patch = async (link: string, body: Object) => {
    return tratarRequisicao(api.patch(link, body)).then((res) => {
        return res.data
    })
}
export const del = async (link: string) => {
    return tratarRequisicao(api.delete(link)).then((res) => {
        return res.data
    })
}