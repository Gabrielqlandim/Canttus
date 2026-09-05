import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

export function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(evento:React.FormEvent) {
        evento.preventDefault();
        await login(username, password);
        navigate('/');
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" value={username}
            onChange={(e)=> setUsername(e.target.value)}
            placeholder="Usuário"/>
            <input
            type="password" value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="Senha"/>
            <button type="submit">Entrar</button>
        </form>
    );
}