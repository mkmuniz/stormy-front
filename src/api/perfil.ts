import { post, patch } from './request';

export async function mudarUsuario(id: String, body: any) {
    try {
        const dados = patch('/user/' + id, body)
        return dados;
    } catch(err) {
        return err
    }
}