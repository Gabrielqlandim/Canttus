import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from '../api/client';
import { criarReserva } from "../api/reservas";
import type { Imovel } from "../types/Imovel";
import toast from "react-hot-toast";

export function DetalheImovel(){
    const { id } = useParams();
    const [imovel, setImovel] = useState<Imovel | null>(null);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

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
            toast.success('Reserva criada com sucesso!');
        } catch (erro){
            if(axios.isAxiosError(erro)){
                toast.error('Erro: ' + JSON.stringify(erro.response?.data));
            }
        }
    }


    if (!imovel) return <p className="text-center py-12 text-gray-500">Carregando...</p>;

    return (
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <div className="h-64 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6">
                    Sem foto
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{imovel.titulo}</h1>
                <p className="text-gray-500 mt-1">{imovel.cidade}</p>
                <p className="mt-4 text-gray-700">{imovel.descricao}</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 h-fit">
                <p className="text-2xl font-bold text-green-700 mb-4">
                    R$ {imovel.diaria}<span className="text-gray-400 font-normal text-sm"> /noite</span>
                </p>
                <form onSubmit={handleReservar} className="flex flex-col gap-3">
                    <label className="text-sm text-gray-600">
                        Check-in
                        <input type="date" value={checkIn} onChange={(e)=>setCheckIn(e.target.value)}
                            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2" />
                    </label>
                    <label className="text-sm text-gray-600">
                        Check-out
                        <input type="date" value={checkOut} onChange={(e)=>setCheckOut(e.target.value)}
                            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2" />
                    </label>
                    <button type='submit' className="mt-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg">
                        Reservar
                    </button>
                </form>
            </div>
        </div>
    );
}