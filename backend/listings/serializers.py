from rest_framework import serializers
from .models import Imovel
class ImovelSerializer(serializers.ModelSerializer):
    anfitriao = serializers.SlugRelatedField(slug_field='username', read_only=True)
    
    class Meta:
        model = Imovel
        fields = ('anfitriao','descricao','titulo','endereco','cidade','diaria','max_hospedes','publicado','data_criacao')
        read_only_fields = ('data_criacao',)