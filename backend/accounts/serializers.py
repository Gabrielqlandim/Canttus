from djoser.serializers import UserSerializer as BaseUserSerializer
from .models import User

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = BaseUserSerializer.Meta.fields + ('is_host', 'num_fone', 'foto_perfil')
