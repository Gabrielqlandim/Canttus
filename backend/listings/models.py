from django.db import models
from django.conf import settings

class Imovel(models.Model):
    anfitriao = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='imoveis')
    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    endereco = models.CharField(max_length=255)
    cidade = models.CharField(max_length=100)
    diaria = models.DecimalField(max_digits=8, decimal_places=2)
    max_hospedes = models.PositiveIntegerField()
    publicado = models.BooleanField(default=True)
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo

class ImovelFoto(models.Model):
    imovel = models.ForeignKey(Imovel, on_delete=models.CASCADE, related_name='fotos')
    imagem = models.ImageField(upload_to='imoveis_fotos/')