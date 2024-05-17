from django.urls import path
from .views import *

urlpatterns = [
    path("lab/services/", LabServiceListAPIView.as_view(),),
    path("lab/service/create/", LabServiceCreateAPIView.as_view()),
    path("lab/service/detail/<int:id>/", LabServiceRetrieveAPIView.as_view()),
    path("lab/service/update/<int:id>/", LabServiceUpdateAPIView.as_view()),
    path("lab/service/delete/<int:id>/", LabServiceDestroyAPIView.as_view()),

    path("lab/procedures/", LabProcedureListAPIView.as_view(),),
    path("lab/procedure/create/", LabProcedureCreateAPIView.as_view()),
    path("lab/procedure/detail/<int:id>/", LabProcedureRetrieveUpdateAPIView.as_view()),
    path("lab/procedure/delete/<int:id>/", LabProcedureDestroyAPIView.as_view()),

    path("lab/appointments/", LabAppointmentListAPIView.as_view(),),
    path("lab/appointment/create/", LabAppointmentCreateAPIView.as_view()),
    path("lab/appointment/detail/<int:id>/", LabAppointmentRetrieveAPIView.as_view()),
    path("lab/appointment/update/<int:id>/", LabAppointmentUpdateAPIView.as_view()),
    path("lab/appointment/delete/<int:id>/", LabAppointmentDestroyAPIView.as_view()),

    path("lab/clients/", ClientListCreateAPIView.as_view(),),
    path("lab/client/detail/<int:id>/", ClientRetrieveUpdateAPIView.as_view()),
    path("lab/client/delete/<int:id>/", ClientDestroyAPIView.as_view()),

    
]