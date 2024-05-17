from django.db import models
from django.contrib.auth import get_user_model
import uuid
from decimal import Decimal

class Client(models.Model):
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    marital_status = models.CharField(max_length=100)
    address = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.first_name
    
    @property
    def patient_name(self):
        if self.middle_name:
            return f'{self.first_name} {self.middle_name} {self.last_name}'
        return f'{self.first_name} {self.last_name}'
    
class LabServiceType(models.Model):
    title = models.CharField(max_length=100)
    added_by = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    def __str__(self) -> str:
        return self.title
class LabProcedure(models.Model):
    title = models.CharField(max_length=100)
    service_type = models.ForeignKey(LabServiceType, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    added_by = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)

    
    tarrifs_per_procedure = {"blood_sugar": 8.42}
    @property
    def nhis_copay_for_insured_clients(self):
        price = Decimal(str(self.price))  # Convert to Decimal
        percentage = Decimal('0.30')  # Convert the percentage to Decimal
        return price - (percentage * price) 

    def __str__(self):
        return self.title

class LabAppointment(models.Model):
    appointment_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    procedure = models.ForeignKey(LabProcedure, on_delete=models.CASCADE)
    date_added = models.DateField(auto_now_add=True)
    time_added = models.DateField(auto_now_add=True)
    client = models.ForeignKey(Client, on_delete=models.PROTECT)
    added_by = models.ForeignKey(get_user_model(), on_delete = models.PROTECT)
    

    def __str__(self):
        return self.appointment_id

        

