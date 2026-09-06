import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { cadastrar } from "../api/auth";

export function Cadastro(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(evento:React.FormEvent) {
        evento.preventDefault();
        try{
            await cadastrar({username, email, password});
            toast.success('Cadastro criado! Confirme seu email antes de logar.');
            navigate('/login');
        }catch{
            toast.error('Erro no cadastro.');
        }
    }

    return(
        <div className="max-w-sm mx-auto mt-16 bg-white border border-gray-100 rounded-xl shadow-sm p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Criar conta</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuário"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Senha"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                <button type="submit" className="mt-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg">
                    Cadastrar
                </button>
            </form>
            <p className="text-sm text-gray-500 text-center mt-4">
                Já tem conta? <Link to="/login" className="text-green-600 font-medium hover:underline">Entrar</Link>
            </p>
        </div>
    );
}
