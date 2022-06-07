import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import ErroPage from '../../pages/erro/index';
import Login from '../../pages/login/index';
import Home from '../../pages/home/index';
import { validarLogin } from '../../utils/jwt';
import Perfil from '../../pages/perfil';
import { LOGIN_TYPES } from '../../utils/types';
import { SistemaProvider } from '../../context/Sistema';
import { limparCookies } from '../../context/cookie';
import Game from '../../components/game';

export function Logout() {
    const contexto: any = useContext(AuthContext);
    
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    contexto.dispatch({ type: LOGIN_TYPES.LOGOUT });

    limparCookies();

    return <Login />;

}

export default function RotasPrivadas() {
    const contexto: any = useContext(AuthContext);


    const loginValidado: any = validarLogin()

    useEffect(() => {
        if (loginValidado.erro) {
            contexto.dispatch({ type: loginValidado.id })
        }
    });

    if (loginValidado.erro) {
        return <Navigate to={{
            pathname: "/login",
        }} />
    }
    return (
        <SistemaProvider>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/game/:id' element={<Game />} />
                <Route path="*" element={() => (<ErroPage />)} />
            </Routes>
        </SistemaProvider>
    );
}