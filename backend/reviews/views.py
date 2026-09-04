from django.shortcuts import render
from django.utils import timezone
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import viewsets
from .models import Avaliacao
from .serializers import AvaliacaoReservaSerializer
from bookings.models import Reserva

class AvaliacaoReservaViewSet(viewsets.ModelViewSet):
    queryset = Avaliacao.objects.all()
    serializer_class = AvaliacaoReservaSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        reserva = serializer.validated_data['reserva']

        if self.request.user != reserva.usuario_inquilino:
            raise PermissionDenied('Você só pode avaliar reservas que você mesmo fez.')

        if reserva.status_reserva == Reserva.Status_reserva.CONFIRMADA and reserva.check_out < timezone.now().date():
            reserva.status_reserva = Reserva.Status_reserva.CONCLUIDA
            reserva.save()

        if reserva.status_reserva != Reserva.Status_reserva.CONCLUIDA:
            raise ValidationError('Só é possível avaliar reservas já concluídas.')

        serializer.save()
