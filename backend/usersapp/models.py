from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserManager

class User(AbstractBaseUser, PermissionsMixin):
    """Overide the default user model."""
    email = models.EmailField(unique=True, null=False, blank=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    is_verified = models.BooleanField(default=False)
    is_lab_technician = models.BooleanField(default=False)
    is_clerk = models.BooleanField(default=False)
    is_employer = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    date_added = models.DateTimeField(auto_now_add = True)
    date_updated = models.DateTimeField(auto_now = True)
    

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)
    
    
