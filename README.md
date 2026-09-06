# Canttus

Projeto pessoal de aluguel de imóveis por temporada, no estilo Airbnb — backend em **Django + Django REST Framework**, frontend em **React + TypeScript**, e um assistente de busca por **IA (PydanticAI + Gemini)**. Construído como projeto de estudo, cobrindo Django, JavaScript/TypeScript, React e conceitos de arquitetura de software.

## Stack

**Backend**

- Django 6.1 + Django REST Framework
- Djoser + djangorestframework-simplejwt (autenticação por JWT, cadastro, confirmação de email)
- django-filter (filtros da API)
- PydanticAI + Gemini (assistente de busca por linguagem natural)
- SQLite (desenvolvimento)
- pytest + pytest-django (testes automatizados)

**Frontend**

- React 19 + TypeScript
- Vite
- react-router-dom (navegação)
- axios (requisições HTTP)
- Vitest + React Testing Library (testes automatizados)

**Infraestrutura**

- Docker + Docker Compose

## Estrutura do projeto

```
Canttus/
├── backend/
│   ├── config/       # configurações do projeto Django
│   ├── accounts/     # usuários, autenticação
│   ├── listings/     # imóveis, fotos
│   ├── bookings/     # reservas
│   ├── reviews/      # avaliações
│   └── ai_agent/     # assistente de busca por IA
└── frontend/
    └── src/
        ├── api/          # chamadas HTTP ao backend
        ├── components/   # componentes reutilizáveis
        ├── context/       # estado global (autenticação)
        ├── pages/         # telas
        └── types/         # tipos TypeScript
```

## Funcionalidades

- Cadastro, login (JWT) e confirmação de conta por email
- Listagem pública de imóveis, com busca, filtro, ordenação e paginação
- Upload de fotos de imóveis (galeria)
- Criação de reservas, com cálculo automático de valor total
- Fluxo de confirmação/cancelamento de reserva, com notificação por email
- Avaliações (só permitidas após a estadia ser concluída)
- Assistente de busca por linguagem natural ("tem imóvel em Recife até R$300?")

## Como rodar

### Opção 1 — Docker (recomendado)

Pré-requisitos: [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado.

1. Crie `backend/.env` com sua chave do Gemini ([gerar aqui](https://aistudio.google.com/apikey)):
   ```
   GOOGLE_API_KEY=sua_chave_aqui
   ```
2. Na raiz do projeto:
   ```bash
   docker compose up --build
   ```
3. Acesse:
   - Frontend: http://localhost:5173
   - API: http://localhost:8000/api/
   - Admin: http://localhost:8000/admin/
   - Documentação da API (Swagger): http://localhost:8000/api/docs/

### Opção 2 — Manual

**Backend**

```bash
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1      # Windows PowerShell
pip install -r requirements.txt
# crie o arquivo .env com GOOGLE_API_KEY=... (veja acima)
python manage.py migrate
python manage.py createsuperuser
python manage.py seed             # opcional: popula com dados de exemplo
python manage.py runserver
```

**Frontend** (em outro terminal)

```bash
cd frontend
npm install
npm run dev
```

## Testes automatizados

**Backend**

```bash
cd backend
pytest
```

**Frontend**

```bash
cd frontend
npm run test
```

## Dados de exemplo (seed)

```bash
python manage.py seed
```

Cria usuários, imóveis, reservas (em diferentes estados) e uma avaliação de exemplo. Pode ser rodado várias vezes sem duplicar dados.

## Endpoints principais da API

| Endpoint                               | Descrição                            |
| -------------------------------------- | -------------------------------------- |
| `POST /auth/users/`                  | Cadastro                               |
| `POST /auth/jwt/create/`             | Login                                  |
| `GET/POST /api/imoveis/`             | Listar / criar imóveis                |
| `GET /api/imoveis/restrito/`         | Listagem restrita a contas confirmadas |
| `POST /api/fotos/`                   | Adicionar foto a um imóvel            |
| `GET/POST /api/reservas/`            | Listar / criar reservas                |
| `POST /api/reservas/<id>/confirmar/` | Anfitrião confirma a reserva          |
| `POST /api/reservas/<id>/cancelar/`  | Hóspede ou anfitrião cancela         |
| `POST /api/avaliacoes/`              | Avaliar uma reserva concluída         |
| `POST /api/assistente/`              | Perguntar ao assistente de IA          |
