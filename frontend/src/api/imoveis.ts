import api from './client';
import type {Imovel} from '../types/Imovel';
import type { RespostaPaginada } from '../types/Paginacao';

export async function buscarImoveis(params?: { search?: string }): Promise<RespostaPaginada<Imovel>> {
    const resposta = await api.get<RespostaPaginada<Imovel>>('api/imoveis/', { params });
    return resposta.data
}

interface ImovelPayload {
    titulo: string;
    descricao: string;
    endereco: string;
    cidade: string;
    diaria: string;
    max_hospedes: number;
    publicado: boolean;
}

export async function criarImovel(dados: ImovelPayload): Promise<Imovel> {
    const resposta = await api.post<Imovel>('api/imoveis/', dados);
    return resposta.data;
}

export async function adicionarFotoImovel(imovelId: number, arquivo: File) {
    const formData = new FormData();
    formData.append('imovel', String(imovelId));
    formData.append('imagem', arquivo);

    const resposta = await api.post('api/fotos/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return resposta.data;
}
