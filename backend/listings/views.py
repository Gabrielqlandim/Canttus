from django.shortcuts import render
from rest_framework import viewsets, filters
from .serializers import ImovelSerializer
from .models import Imovel
from rest_framework.permissions import IsAuthenticated, AllowAny 
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from .permissions import ExigeEmailConfirmado

class ImovelViewSet(viewsets.ModelViewSet):
    queryset = Imovel.objects.all()
    serializer_class = ImovelSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    filterset_fields = ['cidade', 'publicado']
    search_fields = ['titulo','descricao','cidade']
    ordering_fields = ['data_criacao', 'diaria']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        if self.action == 'restrito':
            return [ExigeEmailConfirmado()]
        return [IsAuthenticated()]
    
    @action(detail=False, methods=['get'])  
    def restrito(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def perform_create(self, serializer):
        serializer.save(anfitriao=self.request.user)
