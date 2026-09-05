import { useState } from 'react';
import { criarAvaliacao } from '../api/avaliacoes';

export function FormAvaliacao({reservaId}: {reservaId: number}){
    const [nota, setNota] = useState(5);
    const [comentario, setComentario] = useState('');
    const [enviado, setEnviado] = useState(false);

    async function handleSubmit(evento: React.FormEvent){
        evento.preventDefault();
        await criarAvaliacao({reserva: reservaId, nota, comentario});
        setEnviado(true);
    }

    if(enviado)
        return <p>Avaliação enviada!</p>;

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" min={1} max={5} value={nota} onChange={(e) => setNota(Number(e.target.value))} />
            <input value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Comentário" />
            <button type="submit">Avaliar</button>
        </form>
    );
}
