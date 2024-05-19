from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password']
        extra_kwargs = {"password":{"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
class UserLoginSerializer(serializers.Serializer):
    """Serializing during user authentication."""
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user 
        raise serializers.ValidationError("Invalid Email or Password!")
    

class UserPasswordRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()
    def validate(self, attrs):
        return super().validate(attrs)
    
class UserSetNewPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['password']


class TokenIsExpiredSerializer(serializers.Serializer):
    token = serializers.CharField()

    def validate(self, attrs):
        return super().validate(attrs)
    
class LabTechSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email","first_name","last_name","password", "is_lab_technician", "is_verified"]
    
class LabClerkSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email","first_name","last_name","password", "is_clerk", "is_verified"]

class EmployerSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email","first_name","last_name","password", "is_employer", "is_verified"]
