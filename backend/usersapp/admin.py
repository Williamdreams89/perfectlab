from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    """For the admin interface."""
    list_display = ['id', 'email', 'first_name', 'last_name', 'date_added', 'date_updated','is_verified', 'is_superuser', "is_lab_technician", "is_clerk", "is_employer", "password"]

admin.site.register(User, UserAdmin)
