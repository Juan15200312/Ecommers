from rest_framework import serializers

from Users.models import CustomUser
from Users.serializers.info_serializer import InfoSerializer


class UserFullSerializer(serializers.ModelSerializer):
    info = InfoSerializer()

    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email', 'role', 'slug', 'info')
