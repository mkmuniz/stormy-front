import { decode } from 'jsonwebtoken';
import React, { Component, useCallback, useMemo, useReducer } from 'react';
import { setHeaderAuth } from '../api/request';
import { validarToken } from '../utils/jwt';
import { LOGIN_TYPES, ERRO_TYPES, COOKIE_TYPES } from '../utils/types';
import { buscarCookie, limparCookies } from './cookie';
const valorInicial = Object.freeze({
    username: undefined,
    token: undefined,
})

export const AuthContext = React.createContext({ ...valorInicial, dispatch: undefined })

function authReducer(state: any, action: any) {

    if (action.type === LOGIN_TYPES.OK) {
        const token: any = action.dados.token
        const username = decode(token)
        setHeaderAuth()
        return { ...state, username, token}
    }

    /* Caso tenha algum erro ou Logout */

    limparCookies();

    switch (action.type) {
        case LOGIN_TYPES.LOGOUT:
            return { ...valorInicial, mensagemErro: undefined }
        case LOGIN_TYPES.PAGINA_NAO_ENCONTRADA:
            return { ...valorInicial, mensagemErro: ERRO_TYPES.PAGINA_NAO_ENCONTRADA.msg }
        case LOGIN_TYPES.USUARIO_SENHA_INVALIDO:
            return { ...valorInicial, mensagemErro: ERRO_TYPES.USUARIO_SENHA_INVALIDO.msg }
        case LOGIN_TYPES.JWT_NAO_DEFINIDA:
            return { ...valorInicial, mensagemErro: ERRO_TYPES.JWT_NAO_DEFINIDA.msg }
        case LOGIN_TYPES.JWT_TEMPO_EXPIRADO:
            return { ...valorInicial, mensagemErro: ERRO_TYPES.JWT_TEMPO_EXPIRADO.msg }
        case LOGIN_TYPES.JWT_NAO_AUTENTICADO:
            return { ...valorInicial, mensagemErro: ERRO_TYPES.JWT_NAO_AUTENTICADO.msg }
        default:
            return { ...valorInicial, mensagemErro: ERRO_TYPES.GENERICO.msg }
    }
}

export const AuthProvider: React.FC = ({ children }: any) => {

    /* states */
    const [dados, dispatch] = useReducer(authReducer, valorInicial);

    const resolverTokenInvalido = useCallback((erro) => {
        return authReducer(dados, { type: erro.id })
    }, [dados])

    const dadosCookie = useMemo(() => {


        const cookieToken = buscarCookie(COOKIE_TYPES.USUARIO)

        if (dados && dados.mensagemErro) {
            /* caso tenha mensagem de erro (ex: tempo expirado) */
            limparCookies();
            return { ...valorInicial, mensagemErro: dados.mensagemErro }
        } else if (dados && dados.token) {

            const tokenValidado: any = validarToken(dados.token);

            if (!tokenValidado.erro) {
                return dados
            }

            return resolverTokenInvalido(tokenValidado.erro);



        } else if (cookieToken) {
            /* Quando faz o login não tem estado pois se atualizar o estado irá renderizar tudo novamente
            então só existe o cookie. Então entra nesse caso */
            const tokenValidado: any = validarToken(cookieToken);
            if (!tokenValidado.erro) {
                return authReducer(dados, { type: LOGIN_TYPES.OK, dados: { token: cookieToken } })
            }

            return resolverTokenInvalido(tokenValidado);
        }
        
        return valorInicial;
    }, [dados, resolverTokenInvalido]);
    return ( 
    <AuthContext.Provider value={{ ...dadosCookie, dispatch }}>
        {children}
    </AuthContext.Provider>
    );
    
}