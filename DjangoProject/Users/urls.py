from django.urls import path
from django.conf.urls.static import static
from Ecommerce import settings
from Users.views import LogoutView, LoginView, RegisterView
from Users.views.user_full_view import UserFullView
from Users.views.user_part_view import UserPartView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),


    path('user-full/', UserFullView.as_view(), name='user-full'),
    path('user-part/', UserPartView.as_view(), name='user-part'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)