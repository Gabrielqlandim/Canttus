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
        <div>
            <h1>Imoveis disponíveis</h1>
            <ul>
                {imoveis.map((imovel)=>
                <li key={imovel.id}>
                    <Link to={`/imoveis/${imovel.id}`}> {imovel.titulo}</Link> - {imovel.cidade} - R${imovel.diaria}/noite
                </li>)}
            </ul>
        </div>
    );
}