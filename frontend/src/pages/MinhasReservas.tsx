import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { buscarMinhasReservas, confirmarReserva, cancelarReserva } from "../api/reservas";
import type { Reserva } from '../api/reservas';
import { FormAvaliacao } from "../components/FormAvaliacao";
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
        await confirmarReserva(id);
        const dados = await buscarMinhasReservas();
        setReservas(dados.results);
    }

    async function handleCancelar(id:number) {
        await cancelarReserva(id);
        const dados = await buscarMinhasReservas();
        setReservas(dados.results);
    }

    return (
        <div>
            <h1>Minhas Reservas</h1>
            <ul>
                {reservas.map((reserva) =>(
                    <li key={reserva.id}>
                        {reserva.check_in} até {reserva.check_out} - {reserva.status_reserva} - R$ {reserva.valor_total}
                        <button onClick={() => handleConfirmar(reserva.id)}>Confirmar reserva</button>
                        <button onClick={() => handleCancelar(reserva.id)}>Cancelar reserva</button>
                        {reserva.status_reserva === 'concluida' && (
                            <FormAvaliacao reservaId={reserva.id}/>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}