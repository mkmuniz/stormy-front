import React, { useContext, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';

/* contexto */
import { AuthContext } from '../../../context/Auth';

/* utils */
import { validarLogin } from '../../../utils/jwt';

export function RotaRestrita({ component: Component, ...rest }: any) {


    const dispatch: any = useContext(AuthContext);

    const loginValidado: any = validarLogin()

    useEffect(() => {
        if (loginValidado.erro) {
            dispatch({ type: loginValidado.id })
        }
    });

    if (loginValidado.erro) {
        return <Navigate to={{
            pathname: "/",
        }} />
    }

    return (
        <Route
          {...rest}
          render={(props: JSX.IntrinsicAttributes) => {
            return <Component {...props} />
          }}
        ></Route>
      )

}