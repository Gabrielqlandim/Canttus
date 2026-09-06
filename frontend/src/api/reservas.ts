import type { RespostaPaginada } from "../types/Paginacao";
import api from "./client";

interface ReservaPayLoad{
    imovel_reservado: number;
    check_in: string;
    check_out: string;
}

export interface Reserva{
    id: number;
    imovel_reservado: number;
    usuario_inquilino: string;
    check_in: string;
    check_out: string;
    status_reserva: string;
    valor_diaria: string;
    valor_total: string;
    ja_avaliada: boolean;
}

export async function buscarMinhasReservas(): Promise<RespostaPaginada<Reserva>> {
    const resposta = await api.get<RespostaPaginada<Reserva>>('api/reservas/');
    return resposta.data;
}

export async function confirmarReserva(id: number){
    const resposta = await api.post(`api/reservas/${id}/confirmar/`);
    return resposta.data;
}

export async function cancelarReserva(id:number) {
    const resposta = await api.post(`api/reservas/${id}/cancelar/`);
    return resposta.data
}

export async function criarReserva(dados: ReservaPayLoad){
    const resposta = await api.post('api/reservas/', dados);
    return resposta.data
}

