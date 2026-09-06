import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { buscarMinhasReservas, confirmarReserva, cancelarReserva } from "../api/reservas";
import type { Reserva } from '../api/reservas';
import { FormAvaliacao } from "../components/FormAvaliacao";
import toast from "react-hot-toast";

function corDoStatus(status: string) {
    switch (status) {
        case 'pendente': return 'bg-yellow-100 text-yellow-700';
        case 'confirmada': return 'bg-green-100 text-green-700';
        case 'concluida': return 'bg-blue-100 text-blue-700';
        case 'cancelada': return 'bg-red-100 text-red-700';
        default: return 'bg-gray-100 text-gray-700';
    }
}

export function MinhasReservas(){
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const estaLogado = !!localStorage.getItem('access_token');

    useEffect(()=> {
        async function carregar() {
            const dados = await buscarMinhasReservas();
            setReservas(dados.results);
        }
        carregar();
    }, []);

    if(!estaLogado) return <Navigate to="/login" />;

    async function handleConfirmar(id:number) {
        try{
            await confirmarReserva(id);
            toast.success('Reserva confirmada!');
            const dados = await buscarMinhasReservas();
            setReservas(dados.results);
        }catch{
            toast.error('Não foi possível confirmar essa reserva.');
        }
    }

    async function handleCancelar(id:number) {
        try {
            await cancelarReserva(id);
            toast.success('Reserva cancelada!');
            const dados = await buscarMinhasReservas();
            setReservas(dados.results);
        } catch{
            toast.error('Não foi possível cancelar essa reserva.');
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Minhas Reservas</h1>
            <div className="flex flex-col gap-4">
                {reservas.map((reserva) => {
                    const podeConfirmar = reserva.status_reserva === 'pendente';
                    const podeCancelar = reserva.status_reserva === 'pendente' || reserva.status_reserva === 'confirmada';

                    return (
                        <div key={reserva.id} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-gray-700">{reserva.check_in} até {reserva.check_out}</p>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${corDoStatus(reserva.status_reserva)}`}>
                                    {reserva.status_reserva}
                                </span>
                            </div>
                            <p className="text-green-700 font-bold mb-3">R$ {reserva.valor_total}</p>

                            {(podeConfirmar || podeCancelar) && (
                                <div className="flex gap-2">
                                    {podeConfirmar && (
                                        <button onClick={() => handleConfirmar(reserva.id)}
                                            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg">
                                            Confirmar
                                        </button>
                                    )}
                                    {podeCancelar && (
                                        <button onClick={() => handleCancelar(reserva.id)}
                                            className="bg-gray-100 hover:bg-red-100 hover:text-red-700 text-sm px-4 py-2 rounded-lg">
                                            Cancelar
                                        </button>
                                    )}
                                </div>
                            )}

                            {reserva.status_reserva === 'concluida' && (
                                <div className="mt-4 border-t border-gray-100 pt-4">
                                    {reserva.ja_avaliada ? (
                                        <p className="text-sm text-gray-500">Você já avaliou essa estadia. Obrigado!</p>
                                    ) : (
                                        <FormAvaliacao reservaId={reserva.id}/>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
