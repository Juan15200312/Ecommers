from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken


class LogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    def validate(self, data):
        refresh_token = data['refresh_token']
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return {
                'success': True,
                'message': 'Se cerró la sesión con éxito'
            }
        except Exception:
            raise serializers.ValidationError("Token inválido")