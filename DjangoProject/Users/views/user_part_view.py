from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from Users.models import CustomUser
from Users.serializers.user_part_serializer import UserPartSerializer


class UserPartView(GenericAPIView):
    serializer_class = UserPartSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)