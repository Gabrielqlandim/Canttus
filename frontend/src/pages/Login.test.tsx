import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect } from 'vitest';
import { Login } from './Login';
import * as apiAuth from '../api/auth';
import { AuthProvider } from '../context/AuthContext';

vi.mock('../api/auth');

describe('Login', () => {
  it('chama login com o usuário e a senha digitados', async () => {
    vi.mocked(apiAuth.login).mockResolvedValue({ access: 'token-falso', refresh: 'refresh-falso' });

    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Usuário'), { target: { value: 'gabriel' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'SenhaForte123!' } });
    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(apiAuth.login).toHaveBeenCalledWith('gabriel', 'SenhaForte123!');
    });
  });
});
