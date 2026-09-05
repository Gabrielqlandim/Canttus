import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {setEstaLogado} = useAuth();
    
    async function handleSubmit(evento:React.FormEvent) {
        evento.preventDefault();
        await login(username, password);
        setEstaLogado(true);
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