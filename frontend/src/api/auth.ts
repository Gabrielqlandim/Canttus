import api from './client';

interface TokensResposta{
    access: string;
    refresh: string;
}

export async function login(username:string, password: string): Promise<TokensResposta> {
    const resposta = await api.post<TokensResposta>('auth/jwt/create/',{username, password});
    localStorage.setItem('access_token', resposta.data.access);
    localStorage.setItem('refresh_token', resposta.data.refresh);
    return resposta.data;
}