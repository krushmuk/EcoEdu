from attr.validators import max_len
from django.contrib.auth.models import AbstractUser
from django.db import models
from rest_framework import fields
from multiselectfield import MultiSelectField

class Event(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    categories = models.CharField(max_length=100)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True,)
    ac_type = models.SmallIntegerField() #0 - user, 1 - organization, 2 - admin
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

  
