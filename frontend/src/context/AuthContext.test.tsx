import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';

function Consumidor() {
  const { estaLogado, logout } = useAuth();
  return (
    <div>
      <span>{estaLogado ? 'logado' : 'deslogado'}</span>
      <button onClick={logout}>sair</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('começa deslogado quando não existe token no localStorage', () => {
    render(
      <AuthProvider>
        <Consumidor />
      </AuthProvider>
    );
    expect(screen.getByText('deslogado')).toBeInTheDocument();
  });

  it('começa logado se já existir um token salvo', () => {
    localStorage.setItem('access_token', 'abc');
    render(
      <AuthProvider>
        <Consumidor />
      </AuthProvider>
    );
    expect(screen.getByText('logado')).toBeInTheDocument();
  });

  it('logout limpa o token e atualiza o estado', () => {
    localStorage.setItem('access_token', 'abc');
    render(
      <AuthProvider>
        <Consumidor />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('sair'));

    expect(screen.getByText('deslogado')).toBeInTheDocument();
    expect(localStorage.getItem('access_token')).toBeNull();
  });
});
