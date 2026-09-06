from rest_framework import serializers


class PerguntaSerializer(serializers.Serializer):
    pergunta = serializers.CharField()


class RespostaAssistenteSerializer(serializers.Serializer):
    resposta = serializers.CharField()
