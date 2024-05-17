from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path("", UserListAPIView.as_view()),
    path('register/', UserRegisterAPIView.as_view(), name="register"),
    path('verify/', VerifyUserAPIView.as_view(), name="verify"),
    path('login/', UserLoginAPIView.as_view(), name="login"),
    path('passreq/', UserPasswordRequestAPIView.as_view(), name="passreq"),
    path('set_password/<uuidb64>/<token>/', UserSetNewPasswordAPIView.as_view(), name="set_password"),
    path("check_token_exp/", TokenIsExpiredOrObjectAPI.as_view()),
    path('oauth2/', include('drf_social_oauth2.urls', namespace='drf')),
    path('refresh_token/', TokenRefreshView.as_view(), name='token_refresh'),


]