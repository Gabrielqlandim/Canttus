from django.db import models
from listings.models import Imovel
from django.conf import settings

class Reserva(models.Model):
    imovel_reservado = models.ForeignKey(Imovel,on_delete=models.PROTECT ,related_name='imovel_reservado')
    usuario_inquilino = models.ForeignKey(settings.AUTH_USER_MODEL ,on_delete= models.PROTECT, related_name='inquilino')
    check_in = models.DateField()
    check_out = models.DateField()
    #status_reserva = models.CharField(max_length=20)
    data_criacao_reserva = models.DateTimeField(auto_now_add=True)