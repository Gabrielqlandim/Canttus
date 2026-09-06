import datetime
from decimal import Decimal

from django.core.management.base import BaseCommand

from accounts.models import User
from listings.models import Imovel
from bookings.models import Reserva
from reviews.models import Avaliacao


class Command(BaseCommand):
    help = 'Popula o banco com dados de exemplo (usuários, imóveis, reservas, avaliações).'

    def handle(self, *args, **options):
        anfitrioes = self._criar_usuarios(
            [('carla', 'carla@teste.com'), ('bruno', 'bruno@teste.com')]
        )
        hospedes = self._criar_usuarios(
            [('maria', 'maria@teste.com'), ('joao', 'joao@teste.com')]
        )

        imoveis_dados = [
            (anfitrioes[0], 'Apartamento na Praia', 'Recife', '250.00', 4),
            (anfitrioes[0], 'Studio no Centro', 'Recife', '150.00', 2),
            (anfitrioes[1], 'Chalé na Serra', 'Gramado', '400.00', 5),
            (anfitrioes[1], 'Casa de Campo', 'Gramado', '300.00', 6),
            (anfitrioes[0], 'Loft Moderno', 'São Paulo', '350.00', 3),
        ]
        imoveis = []
        for anfitriao, titulo, cidade, diaria, max_hospedes in imoveis_dados:
            imovel, _ = Imovel.objects.get_or_create(
                titulo=titulo,
                defaults={
                    'anfitriao': anfitriao,
                    'descricao': f'{titulo} bem localizado em {cidade}.',
                    'endereco': f'Rua Exemplo, 100 - {cidade}',
                    'cidade': cidade,
                    'diaria': diaria,
                    'max_hospedes': max_hospedes,
                    'publicado': True,
                },
            )
            imoveis.append(imovel)
            anfitriao.is_host = True
            anfitriao.save()

        hoje = datetime.date.today()
        reservas_dados = [
            (imoveis[0], hospedes[0], hoje + datetime.timedelta(days=10), hoje + datetime.timedelta(days=15), Reserva.Status_reserva.PENDENTE),
            (imoveis[1], hospedes[1], hoje + datetime.timedelta(days=20), hoje + datetime.timedelta(days=22), Reserva.Status_reserva.CONFIRMADA),
            (imoveis[2], hospedes[0], hoje - datetime.timedelta(days=20), hoje - datetime.timedelta(days=15), Reserva.Status_reserva.CONCLUIDA),
            (imoveis[3], hospedes[1], hoje + datetime.timedelta(days=5), hoje + datetime.timedelta(days=8), Reserva.Status_reserva.CANCELADA),
        ]
        reservas = []
        for imovel, hospede, check_in, check_out, status in reservas_dados:
            dias = (check_out - check_in).days
            diaria = Decimal(str(imovel.diaria))
            reserva, _ = Reserva.objects.get_or_create(
                imovel_reservado=imovel,
                usuario_inquilino=hospede,
                check_in=check_in,
                defaults={
                    'check_out': check_out,
                    'status_reserva': status,
                    'valor_diaria': diaria,
                    'valor_total': dias * diaria,
                },
            )
            reservas.append(reserva)

        # avaliação só faz sentido pra reserva concluída
        reserva_concluida = reservas[2]
        Avaliacao.objects.get_or_create(
            reserva=reserva_concluida,
            defaults={'nota': 5, 'comentario': 'Estadia excelente, recomendo!'},
        )

        self.stdout.write(self.style.SUCCESS(
            f'Seed concluída: {len(anfitrioes) + len(hospedes)} usuários, '
            f'{len(imoveis)} imóveis, {len(reservas)} reservas, 1 avaliação.'
        ))

    def _criar_usuarios(self, dados):
        usuarios = []
        for username, email in dados:
            usuario, criado = User.objects.get_or_create(
                username=username,
                defaults={'email': email, 'is_active': True},
            )
            if criado:
                usuario.set_password('SenhaForte123!')
                usuario.save()
            usuarios.append(usuario)
        return usuarios
