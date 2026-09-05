import React, { useState } from "react";
import { cadastrar } from "../api/auth";

export function Cadastro(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensagem, setMensagem] = useState('');

    async function  handleSubmit(evento:React.FormEvent) {
        evento.preventDefault();
        try{
            await cadastrar({username, email, password});
            setMensagem('Cadastro criado! Confirme seu email antes de logar.');

        }catch{
            setMensagem('Erro no cadastro.');
        }
    }
    return(
        <form onSubmit={handleSubmit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuário"/>
        <input value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email" />
        <input type= "password" onChange={(e)=> setPassword(e.target.value)} placeholder="Senha"/>
        <button type="submit">Cadastrar</button>
        {mensagem && <p>{mensagem}</p>}
        </form>
    );
}