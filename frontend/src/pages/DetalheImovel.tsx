import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from '../api/client';
import { criarReserva } from "../api/reservas";
import type { Imovel } from "../types/Imovel";

export function DetalheImovel(){
    const { id } = useParams();
    const [imovel, setImovel] = useState<Imovel | null>(null);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [mensagem, setMensagem] = useState('');

    useEffect(()=> {
        async function carregar(){
            const resposta = await api.get<Imovel>(`api/imoveis/${id}/`);
            setImovel(resposta.data);
        }
        carregar();
    },[id]);

    async function handleReservar(evento:React.FormEvent) {
        evento.preventDefault();
        try{
            await criarReserva({
                imovel_reservado: Number(id),
                check_in: checkIn,
                check_out: checkOut,
            });
            setMensagem('Reserva criada com sucesso!');
        } catch (erro){
            if(axios.isAxiosError(erro)){
                setMensagem('Erro: ' + JSON.stringify(erro.response?.data));
            }
        }
    }


    if (!imovel) return <p>Carregando...</p>;

    return (
        <div>
        <h1>{imovel.titulo}</h1>
        <p>{imovel.descricao}</p>
        <p>{imovel.cidade} — R$ {imovel.diaria}/noite</p>

        <form onSubmit={handleReservar}>
            <input type="date" value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} />
            <input type="date" value={checkOut} onChange={(e)=>setCheckOut(e.target.value)}/>
            <button type='submit'>Reservar</button>
        </form>
        {mensagem && <p>{mensagem}</p>}
        </div>
    );
}