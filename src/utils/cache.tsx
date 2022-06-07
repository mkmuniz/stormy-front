
const MINUTOS = 30
export const TEMPO_VALIDADE_CACHE = 1000 * 120 * MINUTOS; /*  2 MIN */

/**@type {import('react-query').UseQueryOptions} */
export const CACHE_CONFIGURACAO = {
     staleTime: TEMPO_VALIDADE_CACHE 
}