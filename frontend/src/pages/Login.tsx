import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {setEstaLogado} = useAuth();

    async function handleSubmit(evento:React.FormEvent) {
        evento.preventDefault();
        try {
            await login(username, password);
            setEstaLogado(true);
            toast.success('Login realizado com sucesso!');
            navigate('/');
        } catch {
            toast.error('Usuário ou senha inválidos.');
        }
    }

    return(
        <div className="max-w-sm mx-auto mt-16 bg-white border border-gray-100 rounded-xl shadow-sm p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Entrar</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input type="text" value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    placeholder="Usuário"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input
                    type="password" value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    placeholder="Senha"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                <button type="submit" className="mt-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg">
                    Entrar
                </button>
            </form>
            <p className="text-sm text-gray-500 text-center mt-4">
                Não tem conta? <Link to="/cadastro" className="text-green-600 font-medium hover:underline">Cadastre-se</Link>
            </p>
        </div>
    );
}
