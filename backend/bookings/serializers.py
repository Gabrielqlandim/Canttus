from rest_framework import serializers
from .models import Reserva

class ReservaSerializer(serializers.ModelSerializer):
    ja_avaliada = serializers.SerializerMethodField()

    class Meta:
        model = Reserva
        fields = ('id','check_in', 'check_out', 'imovel_reservado', 'usuario_inquilino','data_criacao_reserva', 'status_reserva','valor_diaria','valor_total','ja_avaliada')
        read_only_fields = 'usuario_inquilino', 'data_criacao_reserva','status_reserva', 'id','valor_diaria','valor_total'

    def get_ja_avaliada(self, reserva):
        return hasattr(reserva, 'avaliacao')

    def validate(self, dados):
        if dados['check_in']>= dados['check_out']:
            raise serializers.ValidationError("A data de início precisa ser antes da data de fim.")
        return dados
