import pytest
from rest_framework.test import APIClient

from accounts.models import User
from listings.models import Imovel
from bookings.models import Reserva


def criar_reserva_concluivel():
    anfitriao = User.objects.create_user(username='anfitriao', password='x', is_active=True)
    hospede = User.objects.create_user(username='hospede', password='x', is_active=True)
    imovel = Imovel.objects.create(
        anfitriao=anfitriao,
        titulo='Casa',
        descricao='desc',
        endereco='rua x',
        cidade='Recife',
        diaria='100.00',
        max_hospedes=2,
        publicado=True,
    )
    reserva = Reserva.objects.create(
        imovel_reservado=imovel,
        usuario_inquilino=hospede,
        check_in='2024-01-10',
        check_out='2024-01-15',  # já passou, pra permitir avaliação
        status_reserva=Reserva.Status_reserva.CONFIRMADA,
        valor_diaria='100.00',
        valor_total='500.00',
    )
    return anfitriao, hospede, reserva


@pytest.mark.django_db
class TestAvaliacoes:
    def test_nota_fora_do_intervalo_e_rejeitada(self):
        _, hospede, reserva = criar_reserva_concluivel()
        client = APIClient()
        client.force_authenticate(user=hospede)
        resposta = client.post('/api/avaliacoes/', {'reserva': reserva.id, 'nota': 8, 'comentario': 'x'})
        assert resposta.status_code == 400

    def test_so_hospede_pode_avaliar(self):
        anfitriao, _, reserva = criar_reserva_concluivel()
        client = APIClient()
        client.force_authenticate(user=anfitriao)
        resposta = client.post('/api/avaliacoes/', {'reserva': reserva.id, 'nota': 5, 'comentario': 'x'})
        assert resposta.status_code == 403

    def test_nao_permite_avaliacao_duplicada(self):
        _, hospede, reserva = criar_reserva_concluivel()
        client = APIClient()
        client.force_authenticate(user=hospede)
        client.post('/api/avaliacoes/', {'reserva': reserva.id, 'nota': 5, 'comentario': 'boa'})
        resposta = client.post('/api/avaliacoes/', {'reserva': reserva.id, 'nota': 4, 'comentario': 'de novo'})
        assert resposta.status_code == 400
