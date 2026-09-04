from django.shortcuts import render
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import ReservaSerializer
from django.core.mail import send_mail
from .models import Reserva
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


class ReservaViewSet(viewsets.ModelViewSet):
    serializer_class = ReservaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        usuario = self.request.user
        return Reserva.objects.filter(
            Q(usuario_inquilino = usuario) | Q(imovel_reservado__anfitriao = usuario)
        )

    def perform_create(self, serializer):
        data = serializer.validated_data
        dias = (data['check_out'] - data['check_in']).days
        diaria_atual = data['imovel_reservado'].diaria
        valor_total = dias * diaria_atual
        serializer.save(usuario_inquilino=self.request.user, valor_diaria = diaria_atual, valor_total=valor_total)

    @action(detail = True, methods=['post'])
    def confirmar(self, request, pk=None):
        reserva = self.get_object()

        if request.user != reserva.imovel_reservado.anfitriao:
            return Response(
                {'detail': 'Só o anfitrião pode confirmar essa reserva.'},
                status=status.HTTP_403_FORBIDDEN
            )
            
        if reserva.status_reserva != Reserva.Status_reserva.PENDENTE:
            return Response(
                {'detail': 'Só é possível confirmar uma reserva pendente.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        reserva.status_reserva = Reserva.Status_reserva.CONFIRMADA
        reserva.save()

        destinatario = reserva.usuario_inquilino
        send_mail(
            subject='Reserva confirmada',
            message=f'A reserva #{reserva.id} foi confirmada',
            from_email=None,
            recipient_list=[destinatario.email],
        )

        return Response({'status': reserva.status_reserva})
    
    @action(detail = True, methods=['post'])
    def cancelar(self, request, pk=None):
        reserva = self.get_object()
        cliente = request.user == reserva.usuario_inquilino
        anfitriao = request.user == reserva.imovel_reservado.anfitriao

        if not (cliente or anfitriao):
            return Response(
                {'detail': 'Só o anfitrião e o inquilino podem cancelar essa reserva.'},
                status=status.HTTP_403_FORBIDDEN
            )
        if not (reserva.status_reserva == Reserva.Status_reserva.PENDENTE or reserva.status_reserva==Reserva.Status_reserva.CONFIRMADA):
            return Response(
                {'detail': 'Só é possível cancelar uma reserva que esta pendente ou confirmada.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        reserva.status_reserva = Reserva.Status_reserva.CANCELADA
        reserva.save()

        destinatario = reserva.imovel_reservado.anfitriao if cliente else reserva.usuario_inquilino
        send_mail(
            subject='Reserva cancelada',
            message=f'A reserva #{reserva.id} foi cancelada',
            from_email=None,
            recipient_list=[destinatario.email],
        )
        return Response({'status': reserva.status_reserva})

