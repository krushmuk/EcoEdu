from rest_framework import permissions
from DB.models import User
from urllib3 import Retry


class OrganizerOnlyPermission(permissions.BasePermission):
    message = 'You are not  an organizer'

    def has_permission(self, request, view):
        if isinstance(request.user, User) and request.user.ac_type == 1:
            return True
        return False