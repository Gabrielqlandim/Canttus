import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListagemImoveis } from './pages/ListagemImoveis';
import { DetalheImovel } from './pages/DetalheImovel';
import { Login } from './pages/Login';
import { MinhasReservas } from './pages/MinhasReservas'
function App() {
  return( 
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<ListagemImoveis/>} />
      <Route path="/imoveis/:id" element={<DetalheImovel />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/minhas-reservas" element={<MinhasReservas/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App
