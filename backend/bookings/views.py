from django.shortcuts import render
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import ReservaSerializer
from .models import Reserva

class ReservaViewSet(viewsets.ModelViewSet):
    serializer_class = ReservaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        usuario = self.request.user
        return Reserva.objects.filter(
            Q(usuario_inquilino = usuario) | Q(imovel_reservado__anfitriao = usuario)
        )

    def perform_create(self, serializer):
        serializer.save(usuario_inquilino=self.request.user)

