import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { perguntarAssistente } from '../api/assistente';
import { useTypewriter } from '../hooks/useTypewriter';

interface Mensagem {
    autor: 'usuario' | 'canttinhus';
    texto: string;
}

const SAUDACAO = 'Olá, meu nome é Canttinhus, IA do Canttus. Como posso te ajudar?';

export function Canttinhus() {
    const [aberto, setAberto] = useState(false);
    const [pergunta, setPergunta] = useState('');
    const [mensagens, setMensagens] = useState<Mensagem[]>([]);
    const [carregando, setCarregando] = useState(false);
    const saudacaoDigitada = useTypewriter(aberto ? SAUDACAO : '');

    async function handleSubmit(evento: React.FormEvent) {
        evento.preventDefault();
        if (!pergunta.trim()) return;

        const perguntaAtual = pergunta;
        setMensagens((atual) => [...atual, { autor: 'usuario', texto: perguntaAtual }]);
        setPergunta('');
        setCarregando(true);

        const resposta = await perguntarAssistente(perguntaAtual);
        setMensagens((atual) => [...atual, { autor: 'canttinhus', texto: resposta }]);
        setCarregando(false);
    }

    return (
        <div className="fixed bottom-6 right-6 z-20">
            {aberto && (
                <div className="mb-3 w-80 h-96 bg-white border border-gray-200 rounded-xl shadow-xl flex flex-col overflow-hidden">
                    <div className="bg-green-600 text-white px-4 py-3 font-semibold">Canttinhus IA</div>

                    <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2 text-sm">
                        <div className="self-start bg-green-50 text-gray-800 rounded-lg px-3 py-2 max-w-[85%]">
                            {saudacaoDigitada}
                        </div>

                        {mensagens.map((msg, indice) => (
                            <div
                                key={indice}
                                className={`rounded-lg px-3 py-2 max-w-[85%] ${
                                    msg.autor === 'usuario'
                                        ? 'self-end bg-green-600 text-white'
                                        : 'self-start bg-green-50 text-gray-800'
                                }`}
                            >
                                {msg.autor === 'canttinhus' ? (
                                    <div className="prose prose-sm prose-p:my-1 prose-ul:my-1 max-w-none">
                                        <ReactMarkdown>{msg.texto}</ReactMarkdown>
                                    </div>
                                ) : (
                                    msg.texto
                                )}
                            </div>
                        ))}

                        {carregando && (
                            <div className="self-start bg-green-50 text-gray-500 rounded-lg px-3 py-2 text-sm italic">
                                digitando...
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="flex border-t border-gray-100">
                        <input
                            value={pergunta}
                            onChange={(e) => setPergunta(e.target.value)}
                            placeholder="Pergunte sobre imóveis..."
                            className="flex-1 px-3 py-2 text-sm focus:outline-none"
                        />
                        <button type="submit" disabled={carregando} className="px-4 text-green-600 font-medium disabled:opacity-40">
                            Enviar
                        </button>
                    </form>
                </div>
            )}

            <button
                onClick={() => setAberto((atual) => !atual)}
                className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white text-2xl shadow-lg flex items-center justify-center"
            >
                {aberto ? '✕' : '💬'}
            </button>
        </div>
    );
}
