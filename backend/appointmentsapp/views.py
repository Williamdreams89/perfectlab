from rest_framework import status, generics, permissions
from rest_framework.response import Response
from .models import *
from .serializers import *
from .permissions import *


# Lab Service API
class LabServiceCreateAPIView(generics.CreateAPIView):
    """Provide an endpoint to list or create different types of lab services"""
    serializer_class = LabServiceSerializer
    queryset = LabServiceType.objects.all()
    permission_classes = (IsLabServiceCreator, permissions.IsAdminUser,)

class LabServiceListAPIView(generics.ListAPIView):
    serializer_class = LabServiceSerializer
    queryset = LabServiceType.objects.all()
    permission_classes = (IsLabServiceCreator, permissions.IsAdminUser, permissions.IsAuthenticated)

class LabServiceRetrieveAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = LabServiceSerializer
    queryset = LabServiceType.objects.all()
    permission_classes = (IsLabServiceCreator, permissions.IsAdminUser)
    lookup_field = "id"

class LabServiceUpdateAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LabServiceSerializer
    queryset = LabServiceType.objects.all()
    permission_classes = (IsLabServiceCreator, permissions.IsAdminUser)
    lookup_field = "id"

class LabServiceDestroyAPIView(generics.DestroyAPIView):
    serializer_class = LabServiceSerializer
    queryset = LabServiceType.objects.all()
    permission_classes = (IsLabServiceCreator, permissions.IsAdminUser)
    lookup_field = "id"


# Lab Procedure API
class LabProcedureListAPIView(generics.ListAPIView):
    serializer_class = LabProcedureSerializer
    queryset = LabProcedure.objects.all()

class LabProcedureCreateAPIView(generics.CreateAPIView):
    serializer_class = LabProcedureSerializer
    queryset = LabProcedure.objects.all()

class LabProcedureRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = LabProcedureSerializer
    queryset = LabProcedure.objects.all()
    permission_classes = (IsLabProcedureCreator, permissions.IsAdminUser)
    lookup_field = "id"

class LabProcedureDestroyAPIView(generics.DestroyAPIView):
    serializer_class = LabProcedureSerializer
    queryset = LabProcedure.objects.all()
    permission_classes = (IsLabProcedureCreator, permissions.IsAdminUser)
    lookup_field = "id"

# Lab Appointment API

class LabAppointmentListAPIView(generics.ListAPIView):
    serializer_class = LabAppointmentSerializer
    queryset = LabAppointment.objects.all()
    permission_classes = [permissions.IsAuthenticated]

class LabAppointmentCreateAPIView(generics.CreateAPIView):
    serializer_class = LabAppointmentSerializer
    queryset = LabAppointment.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class LabAppointmentRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = LabAppointmentSerializer
    queryset = LabAppointment.objects.all()
    lookup_fields = ["appintment_id", "title"]
    permission_classes = [permissions.IsAuthenticated]

class LabAppointmentUpdateAPIView(generics.UpdateAPIView):
    serializer_class = LabAppointmentSerializer
    queryset = LabAppointment.objects.all()
    permission_classes = (IsLabProcedureCreator, permissions.IsAdminUser)
    lookup_fields = ["appintment_id", "title"]
    

class LabAppointmentDestroyAPIView(generics.DestroyAPIView):
    serializer_class = LabAppointmentSerializer
    queryset = LabAppointment.objects.all()
    permission_classes = ( permissions.IsAuthenticated,)
    lookup_fields = ["appintment_id", "title"]
    permission_classes = [permissions.IsAdminUser]

    
    
class ClientListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()
    permission_classes = [permissions.IsAuthenticated]

class ClientRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()
    permission_classes = ( permissions.IsAuthenticated,)
    lookup_fields = ["id"]

class ClientDestroyAPIView(generics.DestroyAPIView):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()
    permission_classes = ( permissions.IsAuthenticated,)
    lookup_fields = ["id"]



