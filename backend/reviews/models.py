from django.db import models
from bookings.models import Reserva

class Avaliacao(models.Model):
    reserva = models.OneToOneField(Reserva, on_delete=models.CASCADE, related_name='avaliacao')
    nota = models.PositiveSmallIntegerField()
    comentario = models.TextField(blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Avaliação da reserva #{self.reserva.id}'