from rest_framework import serializers
from Users.models import InfoModel


class InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = InfoModel
        fields = ('user', 'phone', 'birth_date', 'image')