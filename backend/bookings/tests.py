import pytest
from rest_framework.test import APIClient

from accounts.models import User
from listings.models import Imovel
from bookings.models import Reserva


def criar_imovel(anfitriao):
    return Imovel.objects.create(
        anfitriao=anfitriao,
        titulo='Casa',
        descricao='desc',
        endereco='rua x',
        cidade='Recife',
        diaria='100.00',
        max_hospedes=2,
        publicado=True,
    )


@pytest.mark.django_db
class TestReservas:
    def test_check_in_apos_check_out_e_rejeitado(self):
        anfitriao = User.objects.create_user(username='anfitriao', password='x', is_active=True)
        hospede = User.objects.create_user(username='hospede', password='x', is_active=True)
        imovel = criar_imovel(anfitriao)

        client = APIClient()
        client.force_authenticate(user=hospede)
        resposta = client.post('/api/reservas/', {
            'imovel_reservado': imovel.id,
            'check_in': '2027-01-20',
            'check_out': '2027-01-10',
        })
        assert resposta.status_code == 400

    def test_criar_reserva_preenche_hospede_e_valor_total(self):
        anfitriao = User.objects.create_user(username='anfitriao', password='x', is_active=True)
        hospede = User.objects.create_user(username='hospede', password='x', is_active=True)
        imovel = criar_imovel(anfitriao)

        client = APIClient()
        client.force_authenticate(user=hospede)
        resposta = client.post('/api/reservas/', {
            'imovel_reservado': imovel.id,
            'check_in': '2027-01-10',
            'check_out': '2027-01-15',
        })

        assert resposta.status_code == 201
        assert resposta.data['usuario_inquilino'] == hospede.id
        assert resposta.data['valor_total'] == '500.00'  # 5 noites x R$100

    def test_so_anfitriao_pode_confirmar(self):
        anfitriao = User.objects.create_user(username='anfitriao', password='x', is_active=True)
        hospede = User.objects.create_user(username='hospede', password='x', is_active=True)
        imovel = criar_imovel(anfitriao)
        reserva = Reserva.objects.create(
            imovel_reservado=imovel,
            usuario_inquilino=hospede,
            check_in='2027-01-10',
            check_out='2027-01-15',
            valor_diaria='100.00',
            valor_total='500.00',
        )

        client = APIClient()
        client.force_authenticate(user=hospede)  # o hóspede, não o anfitrião
        resposta = client.post(f'/api/reservas/{reserva.id}/confirmar/')
        assert resposta.status_code == 403

    def test_usuario_sem_relacao_nao_ve_reserva_de_outros(self):
        anfitriao = User.objects.create_user(username='anfitriao', password='x', is_active=True)
        hospede = User.objects.create_user(username='hospede', password='x', is_active=True)
        estranho = User.objects.create_user(username='estranho', password='x', is_active=True)
        imovel = criar_imovel(anfitriao)
        Reserva.objects.create(
            imovel_reservado=imovel,
            usuario_inquilino=hospede,
            check_in='2027-01-10',
            check_out='2027-01-15',
            valor_diaria='100.00',
            valor_total='500.00',
        )

        client = APIClient()
        client.force_authenticate(user=estranho)
        resposta = client.get('/api/reservas/')
        assert resposta.data['count'] == 0
