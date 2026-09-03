from rest_framework import serializers
from .models import Imovel, ImovelFoto

class ImagemImovelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImovelFoto
        fields = ('id','imovel', 'imagem')

class ImovelSerializer(serializers.ModelSerializer):
    anfitriao = serializers.SlugRelatedField(slug_field='username', read_only=True)
    fotos = ImagemImovelSerializer(many=True, read_only = True)
    class Meta:
        model = Imovel
        fields = ('id', 'anfitriao','descricao','titulo','endereco','cidade','diaria','max_hospedes','publicado','data_criacao','fotos')
        read_only_fields = ('data_criacao',)
