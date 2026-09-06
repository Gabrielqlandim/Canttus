import { useState, useEffect } from "react";
import { buscarImoveis } from "../api/imoveis";
import type { Imovel } from "../types/Imovel";
import { Link } from "react-router-dom";


export function ListagemImoveis(){
    const [imoveis, setImoveis] = useState<Imovel[]>([]);

    useEffect(()=>{
        async function carregar() {
            const dados = await buscarImoveis();
            setImoveis(dados.results);
        }
        carregar();
    }, []);
    return(
        <div className="max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Imóveis disponíveis</h1>
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
                            <h2 className="font-semibold text-gray-900">{imovel.titulo}</h2>
                            <p className="text-sm text-gray-500">{imovel.cidade}</p>
                            <p className="mt-2 text-green-700 font-bold">
                                R$ {imovel.diaria}<span className="text-gray-400 font-normal text-sm"> /noite</span>
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );

}