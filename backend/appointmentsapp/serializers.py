from rest_framework import serializers
from .models import *


class LabAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabAppointment
        fields = "__all__"


class LabServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabServiceType
        fields = "__all__"


class LabProcedureSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabProcedure
        fields = "__all__"

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"
