from rest_framework import serializers
import re
from Users.models import CustomUser


class RegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField(required=True, max_length=50)
    last_name = serializers.CharField(required=True, max_length=50)
    email = serializers.EmailField(required=True, max_length=50)
    password1 = serializers.CharField(required=True, min_length=8)
    password2 = serializers.CharField(required=True, min_length=8)


    def validate_password1(self, password):
        errors = validate_password(password)
        if errors:
            raise serializers.ValidationError(errors)
        return password

    def validate_email(self, email):
        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError('El email ya existe, pruebe con otro')
        return email

    def validate(self, data):
        if data.get('password1') != data.get('password2'):
            raise serializers.ValidationError('Las contraseñas no coinciden')
        return data

    def create(self, validated_data):
        password = validated_data.pop('password1')

        user = CustomUser.objects.create(
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            email=validated_data.get('email'),
        )
        user.set_password(password)
        user.save()
        return user


def validate_password(password):
    errors = []

    if not re.search(r'[A-Z]', password):
        errors.append('La contraseña debe tener al menos una letra mayúscula')

    if not re.search(r'[a-z]', password):
        errors.append('La contraseña debe tener al menos una letra minúscula')

    if not re.search(r'[\d!@#$%^&*(),.?":{}|<>]', password):
        errors.append('La contraseña debe de contener al menos un número o un carácter especial')

    return errors if len(errors)>0 else None


