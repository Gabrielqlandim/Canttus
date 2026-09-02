from rest_framework import serializers
from .models import Reserva

class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = ('check_in', 'check_out', 'imovel_reservado', 'usuario_inquilino','data_criacao_reserva')
        read_only_fields = 'usuario_inquilino', 'data_criacao_reserva'

    def validate(self, dados):
        if dados['check_in']>= dados['check_out']:
            raise serializers.ValidationError("A data de início precisa ser antes da data de fim.")
        return dados