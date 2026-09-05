import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListagemImoveis } from './pages/ListagemImoveis';
import { DetalheImovel } from './pages/DetalheImovel';
import { Login } from './pages/Login';
import { MinhasReservas } from './pages/MinhasReservas'
import { Cadastro } from './pages/Cadastro';

function App() {
  return( 
  <BrowserRouter>
    <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ListagemImoveis/>} />
        <Route path="/imoveis/:id" element={<DetalheImovel />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/minhas-reservas" element={<MinhasReservas/>}/>
        <Route path="/cadastro" element={<Cadastro/>}/>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
  );
}

export default App
