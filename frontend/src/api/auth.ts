import api from './client';

interface TokensResposta{
    access: string;
    refresh: string;
}

interface cadastroPayLoad{
    username: string;
    password: string;
    email: string;
}

export async function cadastrar(dados: cadastroPayLoad){
    const resposta = await api.post('auth/users/', dados);
    return resposta.data
}

export async function login(username:string, password: string): Promise<TokensResposta> {
    const resposta = await api.post<TokensResposta>('auth/jwt/create/',{username, password});
    localStorage.setItem('access_token', resposta.data.access);
    localStorage.setItem('refresh_token', resposta.data.refresh);
    return resposta.data;
}