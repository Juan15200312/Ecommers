from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from Users.models import CustomUser


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(min_length=8, max_length=128)


    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        user = CustomUser.objects.filter(email=email).first()

        if not user:
            raise serializers.ValidationError('El usuario no existe')

        if not user.check_password(password):
            raise serializers.ValidationError('Contraseña incorrecta')

        refresh = RefreshToken.for_user(user)
        token = refresh.access_token

        return {
            'success': True,
            'token': str(token),
            'refresh': str(refresh),
            'user': {
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'rol': user.role,
            }
        }