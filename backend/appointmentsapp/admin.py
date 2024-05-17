from django.contrib import admin
from .models import LabProcedure, LabServiceType, LabAppointment, Client
# Register your models here.

class LabProcedureAdmin(admin.ModelAdmin):
    list_display = ['title', 'service_type', 'price', 'added_by', 'nhis_copay_for_insured_clients']

class LabServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'added_by']

class LabAppointmentAdmin(admin.ModelAdmin):
    list_display = ["appointment_id", 'procedure', 'client', 'added_by', 'date_added', 'time_added']

class ClientAdmin(admin.ModelAdmin):
    list_display = ['patient_name', 'gender', 'phone_number', 'marital_status', 'address']
admin.site.register(LabProcedure, LabProcedureAdmin)
admin.site.register(LabServiceType, LabServiceAdmin)
admin.site.register(LabAppointment, LabAppointmentAdmin)
admin.site.register(Client, ClientAdmin)
