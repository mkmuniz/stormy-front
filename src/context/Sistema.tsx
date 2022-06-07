import React from 'react';
import { useQuery } from 'react-query';
import { get } from '../api/request';
import { Carregando } from '../components/carregando';
import { CACHE_CONFIGURACAO } from '../utils/cache';
import { CACHE_TYPES } from '../utils/types';

function buscarSistema() {
    return get('/sistema')
        .then(requisicao => {
            const eTipoArray = Array.isArray(requisicao.data)
            if (eTipoArray) {
                return requisicao.data[0]
            }
            return requisicao.data;
        })

}

const valorInicial = {
    aberto: true
}

export const SistemaContext = React.createContext(valorInicial)

export function SistemaProvider({ children }: any) {

    const { data, isLoading } = useQuery(CACHE_TYPES.SEMESTRE, buscarSistema, CACHE_CONFIGURACAO)

    return <SistemaContext.Provider
        value={data}
    >
        {
            isLoading
                ? <Carregando />
                : children
        }
    </SistemaContext.Provider>
}