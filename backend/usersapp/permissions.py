from rest_framework import permissions


class IsEmployer(permissions.BasePermission):
    def has_permission(self, request, view, obj):
        return request.user.is_employer