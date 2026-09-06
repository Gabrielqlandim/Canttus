from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from drf_spectacular.utils import extend_schema
from .agent import agent
from .serializers import PerguntaSerializer, RespostaAssistenteSerializer

class AssistenteView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(request=PerguntaSerializer, responses=RespostaAssistenteSerializer)
    def post(self, request):
        pergunta = request.data.get('pergunta')

        if not pergunta:
            return Response({'detail': 'Envie uma pergunta no campo de pergunta'}, status = 400)

        resultado = agent.run_sync(pergunta)
        return Response({'resposta': resultado.output})