from .models import Avaliacao
from rest_framework import serializers

class AvaliacaoReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avaliacao
        fields = ('id','nota', 'comentario','criado_em', 'reserva')
        read_only_fields = ('criado_em',)

    def validate_nota(self, nota):
        if (nota <1 or nota>5):
            raise serializers.ValidationError('A nota precisa estar entre 1 e 5.')
        return nota
