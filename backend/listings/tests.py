import pytest
from rest_framework.test import APIClient

from accounts.models import User


@pytest.mark.django_db
class TestImoveis:
    def test_listar_imoveis_e_publico(self):
        client = APIClient()
        resposta = client.get('/api/imoveis/')
        assert resposta.status_code == 200

    def test_criar_imovel_exige_login(self):
        client = APIClient()
        resposta = client.post('/api/imoveis/', {
            'titulo': 'Casa Teste',
            'descricao': 'desc',
            'endereco': 'rua x',
            'cidade': 'Recife',
            'diaria': '100.00',
            'max_hospedes': 2,
            'publicado': True,
        })
        assert resposta.status_code in (401, 403)

    def test_criar_imovel_define_anfitriao_e_vira_host(self):
        usuario = User.objects.create_user(username='anfitriao', password='SenhaForte123!', is_active=True)
        assert usuario.is_host is False

        # force_authenticate: atalho de teste do DRF que simula "esse usuário está logado"
        # sem precisar passar pelo fluxo real de login/JWT.
        client = APIClient()
        client.force_authenticate(user=usuario)

        resposta = client.post('/api/imoveis/', {
            'titulo': 'Casa Teste',
            'descricao': 'desc',
            'endereco': 'rua x',
            'cidade': 'Recife',
            'diaria': '100.00',
            'max_hospedes': 2,
            'publicado': True,
        })

        assert resposta.status_code == 201
        assert resposta.data['anfitriao'] == 'anfitriao'

        usuario.refresh_from_db()
        assert usuario.is_host is True
