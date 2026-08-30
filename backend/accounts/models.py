from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_host = models.BooleanField(default=False)
    num_fone = models.CharField(max_length=20, blank=True)
    foto_perfil = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    def __str__(self):
        return self.username
