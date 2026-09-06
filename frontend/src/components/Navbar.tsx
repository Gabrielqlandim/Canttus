import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';

export function Navbar(){
    const {estaLogado, logout} = useAuth();
    const navigate = useNavigate();

    function handleLogout(){
        logout();
        navigate('/');
    }

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-10">
        <Link to="/">
            <Logo />
        </Link>
        <div className="flex items-center gap-6 text-gray-700 font-medium">
            {estaLogado ? (
            <>
                <Link to="/minhas-reservas" className="hover:text-green-600">Minhas Reservas</Link>
                <button onClick={handleLogout} className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg">
                Sair
                </button>
            </>
            ) : (
            <>
                <Link to="/login" className="hover:text-green-600">Entrar</Link>
                <Link to="/cadastro" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                Cadastrar
                </Link>
            </>
            )}
        </div>
        </nav>
    );
}