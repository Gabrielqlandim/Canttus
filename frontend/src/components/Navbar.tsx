import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Navbar(){
    const {estaLogado, logout} = useAuth();
    const navigate = useNavigate();

    function handleLogout(){
        logout();
        navigate('/');
    }
    return (
    <nav>
        <Link to="/">Imóveis</Link>
        {estaLogado ? (
        <>
        <Link to="/minhas-reservas">Minhas Reservas</Link>
        <button onClick={handleLogout}>Sair</button>
        </>
        ) : (
        <>
        <Link to="/login">Entrar</Link>
        <Link to="/cadastro">Cadastrar</Link>
        </>
    )}
    </nav>
    );
}