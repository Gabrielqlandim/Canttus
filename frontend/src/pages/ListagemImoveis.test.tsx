import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect } from 'vitest';
import { ListagemImoveis } from './ListagemImoveis';
import * as apiImoveis from '../api/imoveis';

vi.mock('../api/imoveis');
vi.mock('../api/assistente', () => ({
  perguntarAssistente: vi.fn(),
}));

describe('ListagemImoveis', () => {
  it('mostra os imóveis retornados pela API', async () => {
    vi.mocked(apiImoveis.buscarImoveis).mockResolvedValue({
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          id: 1,
          anfitriao: 'gabriel',
          titulo: 'Casa de Praia',
          descricao: 'linda',
          cidade: 'Recife',
          endereco: 'rua x',
          diaria: '200.00',
          max_hospedes: 4,
          publicado: true,
          data_criacao: '2026-01-01',
          fotos: [],
        },
      ],
    });

    render(
      <MemoryRouter>
        <ListagemImoveis />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Casa de Praia/)).toBeInTheDocument();
  });
});
