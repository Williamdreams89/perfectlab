from rest_framework import permissions


class IsEmployer(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.is_employer and
            request.method == 'GET'  # Only allow for POST requests (user creation)
        )