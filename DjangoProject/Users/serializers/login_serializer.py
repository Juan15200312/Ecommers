from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from Users.models import CustomUser
from Users.serializers.user_part_serializer import UserPartSerializer


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(min_length=8, max_length=128)


    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        user = CustomUser.objects.filter(email=email).first()

        if not user:
            raise serializers.ValidationError('Credenciales inválidas. Verifica tu email y contraseña.')

        if not user.check_password(password):
            raise serializers.ValidationError('Credenciales inválidas. Verifica tu email y contraseña.')

        refresh = RefreshToken.for_user(user)
        token = refresh.access_token
        serializer_user = UserPartSerializer(user, context={'request': self.context.get('request')})

        return {
            'success': True,
            'message': f'Bienvenido otra vez {user.first_name}!',
            'token': str(token),
            'refresh': str(refresh),
            'user_part': serializer_user.data
        }