import api from "./client";

export async function perguntarAssistente(pergunta:string): Promise<string> {
    const resposta = await api.post<{resposta:string }>('api/assistente/', {pergunta});
    return resposta.data.resposta;
}