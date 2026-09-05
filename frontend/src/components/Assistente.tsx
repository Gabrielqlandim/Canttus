import { useState } from 'react';
import { perguntarAssistente } from '../api/assistente';

export function Assistente() {
    const [pergunta, setPergunta] = useState('');
    const [resposta, setResposta] = useState('');
    const [carregando, setCarregando] = useState(false);

    async function handleSubmit(evento: React.FormEvent) {
        evento.preventDefault();
        setCarregando(true);
        const texto = await perguntarAssistente(pergunta);
        setResposta(texto);
        setCarregando(false);
    }

    return (
        <div>
        <h2>Canttinhus IA</h2>
        <form onSubmit={handleSubmit}>
            <input value={pergunta} onChange={(e) => setPergunta(e.target.value)} placeholder="Pergunte sobre imóveis..." />
            <button type="submit" disabled={carregando}>{carregando ? 'Pensando...' : 'Perguntar'}</button>
        </form>
        {resposta && <p>{resposta}</p>}
        </div>
    );
}
