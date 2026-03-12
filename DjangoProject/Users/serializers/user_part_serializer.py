from rest_framework import serializers

from Users.models import InfoModel, CustomUser


class UserPartSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email', 'image')

    def get_image(self, obj):
        info = getattr(obj, 'info', None)

        if info and info.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(info.image.url)
            return ''
        return ''
