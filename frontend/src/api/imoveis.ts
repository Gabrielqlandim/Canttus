import api from './client';
import type {Imovel} from '../types/Imovel';
import type { RespostaPaginada } from '../types/Paginacao';

export async function buscarImoveis(params?: { search?: string }): Promise<RespostaPaginada<Imovel>> {
    const resposta = await api.get<RespostaPaginada<Imovel>>('api/imoveis/', { params });
    return resposta.data
}
