import { useState, useEffect } from "react";
import { buscarImoveis } from "../api/imoveis";
import type { Imovel } from "../types/Imovel";
import { Link } from "react-router-dom";

export function ListagemImoveis(){
    const [imoveis, setImoveis] = useState<Imovel[]>([]);
    const [busca, setBusca] = useState('');
    const [termoBuscado, setTermoBuscado] = useState('');

    useEffect(()=>{
        async function carregar() {
            const dados = await buscarImoveis(termoBuscado ? { search: termoBuscado } : undefined);
            setImoveis(dados.results);
        }
        carregar();
    }, [termoBuscado]);

    function handleBuscar(evento: React.FormEvent) {
        evento.preventDefault();
        setTermoBuscado(busca);
    }

    return(
        <div>
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div className="max-w-6xl mx-auto px-6 py-16 text-center">
                    <h1 className="text-4xl font-bold mb-3">Encontre seu próximo destino</h1>
                    <p className="text-green-50 mb-8">Imóveis por temporada, sem taxas escondidas.</p>
                    <form onSubmit={handleBuscar} className="max-w-xl mx-auto bg-white rounded-full shadow-lg flex items-center p-2">
                        <input
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            placeholder="Para onde você vai?"
                            className="flex-1 px-4 py-2 text-gray-900 rounded-full focus:outline-none"
                        />
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium">
                            Buscar
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {termoBuscado ? `Resultados para "${termoBuscado}"` : 'Imóveis disponíveis'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {imoveis.map((imovel) => (
                        <Link
                            key={imovel.id}
                            to={`/imoveis/${imovel.id}`}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
                        >
                            <div className="h-40 bg-green-50 flex items-center justify-center text-green-600 text-sm">
                                Sem foto
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900">{imovel.titulo}</h3>
                                <p className="text-sm text-gray-500">{imovel.cidade}</p>
                                <p className="mt-2 text-green-700 font-bold">
                                    R$ {imovel.diaria}<span className="text-gray-400 font-normal text-sm"> /noite</span>
                                </p>
                            </div>
                        </Link>
                    ))}
                    {imoveis.length === 0 && (
                        <p className="text-gray-500 col-span-full text-center py-12">Nenhum imóvel encontrado.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
