import pytest
from rest_framework.test import APIClient
from accounts.models import User


@pytest.mark.django_db
class TestCadastroELogin:
    def test_cadastro_cria_usuario_inativo(self):
        client = APIClient()
        resposta = client.post('/auth/users/', {
            'username': 'teste', 'email': 'teste@teste.com', 'password': 'SenhaForte123!'
        })
        assert resposta.status_code == 201
        usuario = User.objects.get(username='teste')
        assert usuario.is_active is False

    def test_login_falha_com_conta_nao_confirmada(self):
        User.objects.create_user(username='teste', password='SenhaForte123!', is_active=False)
        client = APIClient()
        resposta = client.post('/auth/jwt/create/', {'username': 'teste', 'password': 'SenhaForte123!'})
        assert resposta.status_code == 401

    def test_login_funciona_com_conta_ativa(self):
        User.objects.create_user(username='teste', password='SenhaForte123!', is_active=True)
        client = APIClient()
        resposta = client.post('/auth/jwt/create/', {'username': 'teste', 'password': 'SenhaForte123!'})
        assert resposta.status_code == 200
        assert 'access' in resposta.data
