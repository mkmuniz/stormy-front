import { post, getUsername } from './request';

export async function cadastrarUsuario(body: Object) {
    try {
        const dados = post('/user', body).then(res => res.data)
        return dados;
    } catch(err) {
        return err
    }
}

export async function buscarUsuario(body: any) {
    try {
        const dados = post('/user/username', body).then(res => res.data)
        return dados;
    } catch(err) {
        return err
    }
}

export async function buscarUsuarioEmail(body: any) {
    try {
        const dados = post('/user/email', body).then(res => res.data)
        return dados;
    } catch(err) {
        return err
    }
}