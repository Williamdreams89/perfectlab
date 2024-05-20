from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from .models import User
from .serializers import *
from .utils import Utils
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
import jwt
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, smart_bytes, force_str
from .permissions import IsEmployer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class UserListAPIView(generics.ListAPIView):
    """List all the users"""
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated,]
    queryset = User.objects.all()

class UserRegisterAPIView(generics.GenericAPIView):
    """Accept user registration and returns a database user"""
    serializer_class = UserRegisterSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data 
        serializer.save()
        # After the user is been saved, we want to send a verification email
        if User.objects.filter(email=serializer.validated_data["email"]).exists():
            user = User.objects.get(email=serializer.validated_data["email"])
            refresh_token = RefreshToken.for_user(user)
            access_token = str(refresh_token.access_token)
            EMAIL_SUBJECT = 'Verify your email'
            current_site = get_current_site(request).domain
            rel_url = reverse('verify')
            abs_url = "{}{}?token={}".format(current_site,rel_url,access_token)
            EMAIL_BODY = "Hello {},\nPlease use the link below to verify your account\n{}".format(user.first_name, abs_url)
            payload = {"EMAIL_SUBJECT": EMAIL_SUBJECT, 'EMAIL_BODY':EMAIL_BODY, "EMAIL_TO": user.email}
            Utils.send_email(payload)
            return Response("User Created.", status=status.HTTP_200_OK)
        return Response("Sorry the user does not exist", status=status.HTTP_400_BAD_REQUEST)
    

class VerifyUserAPIView(views.APIView):
    permission_classes = (IsEmployer,)

    token_param_config = openapi.Parameter(
        "token", in_=openapi.IN_QUERY, description="Enter your  token", type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        try:
            token = request.GET.get("token")
            payload = jwt.decode(token, settings.SECRET_KEY, options={"verify_signature": False})
            user = User.objects.get(id=payload["user_id"])
            user.is_verified = True
            user.save()
            return Response("User is verified", status=status.HTTP_200_OK)
        except jwt.exceptions.ExpiredSignatureError as e:
            return Response("Expired token", status=status.HTTP_400_BAD_REQUEST)
        except jwt.DecodeError as e:
            return Response("Token might have been broken or invalid", status=status.HTTP_400_BAD_REQUEST)
        
class UserLoginAPIView(generics.GenericAPIView):
    """Login functionalites to authenticate users."""
    serializer_class = UserLoginSerializer
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data
        user = User.objects.get(email = serializer.data["email"])
        refresh_token = RefreshToken().for_user(user)
        access_token = refresh_token.access_token
        print({"request_user": str(self.request.user),
            "self.request_user": str(request.data)})
        return Response({
            "message":"Login successful!",
            "tokens":{"refresh_token": str(refresh_token), "access_token":str(access_token)},
            "request_user": str(self.request.user),
            "self.request_user": str(request.data["email"]),
        }, status=status.HTTP_200_OK)

class UserPasswordRequestAPIView(generics.GenericAPIView):
    serializer_class = UserPasswordRequestSerializer
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data
        print(serializer.data)
        # Prepare token and uuidb64 encoder for our user emailing
        if User.objects.filter(email=serializer.data["email"]).exists():
            user = User.objects.get(email=serializer.data["email"])
            token = PasswordResetTokenGenerator().make_token(user)
            uuidb64 = urlsafe_base64_encode(smart_bytes(user.id))

            EMAIL_SUBJECT = 'Reset your password'
            current_site = get_current_site(request).domain
            rel_url = reverse('set_password', kwargs={"token":token, "uuidb64":uuidb64})
            abs_url = "{}{}".format(current_site, rel_url)
            EMAIL_BODY = "Hello {},\nPlease use the link below to set your password:\n{}".format(user.first_name, abs_url)
            payload = {"EMAIL_SUBJECT": EMAIL_SUBJECT, 'EMAIL_BODY':EMAIL_BODY, "EMAIL_TO": user.email}
            Utils.send_email(payload)
            return Response("Check your email for password reset link", status=status.HTTP_200_OK)
        return Response("Email does not exist.", status=status.HTTP_400_BAD_REQUEST)
    
class UserSetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = UserSetNewPasswordSerializer

    def put(self,request, token, uuidb64):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data
        id = force_str(urlsafe_base64_decode(uuidb64))
        if User.objects.filter(id=id).exists():
            user = User.objects.get(id=id)
            if PasswordResetTokenGenerator().check_token(user, token):
                user.set_password(serializer.validated_data["password"])
                user.save()
                return Response("Password reset succesful!", status=status.HTTP_200_OK)
        return Response("Invalid user", status=status.HTTP_400_BAD_REQUEST)
    


class TokenIsExpiredOrObjectAPI(generics.GenericAPIView):
    serializer_class = TokenIsExpiredSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data
        token = serializer.validated_data["token"]
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, options={"verify_signature": False})
            user = User.objects.get(id=payload["user_id"])
            return Response({
                "username": f'{user.first_name} {user.last_name}',
                "not_expired": True,
                "is_lab_tech": str(user.is_lab_technician),
                "is_clerk": str(user.is_clerk),
                "is_employer": str(user.is_employer),
            }, status=status.HTTP_200_OK)
        except jwt.exceptions.ExpiredSignatureError as e:
            return Response({"is_expired":True},status=status.HTTP_400_BAD_REQUEST)
        except jwt.DecodeError as e:
            return Response({"is_invalid":True},status=status.HTTP_400_BAD_REQUEST)
        
class LabTechSignUpAPIView(generics.GenericAPIView):
    """APIView for Lab Technician Sign up"""
    serializer_class = UserRegisterSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data 
        serializer.save()
        # After the user is been saved, we want to send a verification email
        if User.objects.filter(email=serializer.validated_data["email"]).exists():
            user = User.objects.get(email=serializer.validated_data["email"])
            refresh_token = RefreshToken.for_user(user)
            access_token = str(refresh_token.access_token)
            EMAIL_SUBJECT = 'Verify your email'
            current_site = get_current_site(request).domain
            rel_url = reverse('verify')
            abs_url = "{}{}?token={}".format(current_site,rel_url,access_token)
            EMAIL_BODY = "Hello {},\nPlease use the link below to verify your account\n{}\n\n[Please send this link to your employer, in the body of your mail, attach your cv and cover letter for review]".format(user.first_name, abs_url)
            payload = {"EMAIL_SUBJECT": EMAIL_SUBJECT, 'EMAIL_BODY':EMAIL_BODY, "EMAIL_TO": user.email}
            Utils.send_email(payload)
            return Response({"message":"Lab Technician Created.", "email_verify_link":abs_url}, status=status.HTTP_200_OK)
        return Response("Sorry the user does not exist", status=status.HTTP_400_BAD_REQUEST)
        
class LabClerkSignUpAPIView(generics.GenericAPIView):
    """APIView for Lab Technician Sign up"""
    serializer_class = UserRegisterSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data 
        serializer.save()
        # After the user is been saved, we want to send a verification email
        if User.objects.filter(email=serializer.validated_data["email"]).exists():
            user = User.objects.get(email=serializer.validated_data["email"])
            refresh_token = RefreshToken.for_user(user)
            access_token = str(refresh_token.access_token)
            EMAIL_SUBJECT = 'Verify your email'
            current_site = get_current_site(request).domain
            rel_url = reverse('verify')
            abs_url = "{}{}?token={}".format(current_site,rel_url,access_token)
            EMAIL_BODY = "Hello {},\nPlease use the link below to verify your account\n{}\n\n[Please send this link to your employer, in the body of your mail, attach your cv and cover letter for review]".format(user.first_name, abs_url)
            payload = {"EMAIL_SUBJECT": EMAIL_SUBJECT, 'EMAIL_BODY':EMAIL_BODY, "EMAIL_TO": user.email}
            Utils.send_email(payload)
            return Response({"message":"Lab clerk Created.", "email_verify_link":abs_url}, status=status.HTTP_200_OK)
        return Response("Sorry the user does not exist", status=status.HTTP_400_BAD_REQUEST)

    
class EmployerSignUpAPIView(generics.GenericAPIView):
    """APIView for Lab Technician Sign up"""
    serializer_class = UserRegisterSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data 
        serializer.save()
        # After the user is been saved, we want to send a verification email
        if User.objects.filter(email=serializer.validated_data["email"]).exists():
            user = User.objects.get(email=serializer.validated_data["email"])
            refresh_token = RefreshToken.for_user(user)
            access_token = str(refresh_token.access_token)
            EMAIL_SUBJECT = 'Verify your email'
            current_site = get_current_site(request).domain
            rel_url = reverse('verify')
            abs_url = "{}{}?token={}".format(current_site,rel_url,access_token)
            EMAIL_BODY = "Hello {},\nPlease use the link below to verify your account\n{}".format(user.first_name, abs_url)
            payload = {"EMAIL_SUBJECT": EMAIL_SUBJECT, 'EMAIL_BODY':EMAIL_BODY, "EMAIL_TO": user.email}
            Utils.send_email(payload)
            return Response({"message":"Employer Created.", "email_verify_link":abs_url}, status=status.HTTP_200_OK)
        return Response("Sorry the user does not exist", status=status.HTTP_400_BAD_REQUEST)

    
