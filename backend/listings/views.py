from django.shortcuts import render
from rest_framework import viewsets, filters
from .serializers import ImovelSerializer, ImagemImovelSerializer
from .models import Imovel, ImovelFoto
from rest_framework.permissions import IsAuthenticated, AllowAny 
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from .permissions import ExigeEmailConfirmado

class ImagemImovelViewSet(viewsets.ModelViewSet):
    serializer_class = ImagemImovelSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ImovelFoto.objects.filter(imovel__anfitriao = self.request.user)

    def perform_create(self, serializer):
        imovel = serializer.validated_data['imovel']
        if imovel.anfitriao != self.request.user:
            raise PermissionDenied('Você só pode adicionar imagens aos seus próprios imóveis.')
        serializer.save()

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

        if not (self.request.user.is_host):
            self.request.user.is_host = True
            self.request.user.save()
        serializer.save(anfitriao=self.request.user)
