from rest_framework.permissions import BasePermission
from rest_framework import permissions


class IsLabServiceCreator(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.added_by.is_lab_technician == request.user


class IsLabProcedureCreator(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.added_by.is_lab_technician == request.user


class IsLabAppointmentCreator(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.added_by.is_clerk == request.user
