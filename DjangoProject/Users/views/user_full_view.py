from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from Users.models import CustomUser
from Users.serializers.user_full_serializer import UserFullSerializer


class UserFullView(GenericAPIView):
    serializer_class = UserFullSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)