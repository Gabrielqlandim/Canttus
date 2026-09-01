from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ImovelSerializer
from .models import Imovel
from rest_framework.permissions import IsAuthenticated

class ImovelViewSet(viewsets.ModelViewSet):
    queryset = Imovel.objects.all()
    serializer_class = ImovelSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(anfitriao=self.request.user)
