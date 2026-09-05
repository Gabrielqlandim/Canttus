import api from "./client";

interface AvaliacaoPayLoad{
    reserva: number;
    nota: number;
    comentario: string;
}

export async function criarAvaliacao(dados:AvaliacaoPayLoad) {
    const resposta = await api.post('api/avaliacoes/', dados);
    return resposta.data
}
