import { get, postMessage, postResposta } from './request';

export async function buscarJogos() {
    try {
        const dados = get('/games');
        return dados;
    } catch(err) {
        return err
    }
}

export async function buscarUm(id: any) {
    try {
        const dados = get('/games/' + id);
        return dados;
    } catch(err) {
        return err
    }
}

export async function enviarComentario(id: any, body: any) {
    try {
        const dados = postMessage('/games/comentar/' + id, body);
        return dados;
    } catch(err) {
        return err
    }
}

export async function enviarResposta(id: any, body: any) {
    try {
        const dados = postResposta('/games/responder/' + id, body);
        return dados;
    } catch(err) {
        return err
    }
}