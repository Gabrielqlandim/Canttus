import { useState } from 'react';
import { criarAvaliacao } from '../api/avaliacoes';
import toast from 'react-hot-toast';

export function FormAvaliacao({reservaId}: {reservaId: number}){
    const [nota, setNota] = useState(5);
    const [comentario, setComentario] = useState('');
    const [enviado, setEnviado] = useState(false);

    async function handleSubmit(evento: React.FormEvent){
        evento.preventDefault();
        try {
            await criarAvaliacao({reserva: reservaId, nota, comentario});
            toast.success('Avaliação enviada!');
            setEnviado(true);
        } catch{
            toast.error('Não foi possível enviar a avaliação.');
        }
    }

    if(enviado)
        return <p className="text-sm text-green-700 font-medium">Avaliação enviada, obrigado!</p>;

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">Como foi sua estadia?</p>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((valor) => (
                    <button
                        key={valor}
                        type="button"
                        onClick={() => setNota(valor)}
                        className={`text-2xl leading-none ${valor <= nota ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                        ★
                    </button>
                ))}
            </div>
            <input value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Comentário"
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button type="submit" className="self-start bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg">
                Avaliar
            </button>
        </form>
    );
}
