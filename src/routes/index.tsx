import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import RotasPrivadas from './private';
import { RotasPublicas } from './public';
import { AuthContext } from '../context/Auth';
import { useContext } from 'react';

export function Rotas () {
    const authContext = useContext(AuthContext);
    return (<Router>
            {(authContext.username != undefined)
            ?
            <RotasPrivadas />:
            <RotasPublicas />}
        </Router>
    );    
}