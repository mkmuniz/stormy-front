import { get, post, postAuth } from './request';

export async function fazerLogin(body: any) {
    try {
        const dados = post('/login', body);
        return dados;
    } catch(err) {
        return err
    }
}