from django.db import models
from django.contrib.auth.models import AbstractUser,AbstractBaseUser
from django.utils.translation import gettext_lazy as gtl
from django.contrib.auth.models import PermissionsMixin
# Create your models here.

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    username = None


    name =  models.CharField(max_length=256,default='Anonymous')
    email =  models.EmailField(gtl('email address'),max_length=256,unique=True)



    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    phone = models.CharField(max_length=20,blank=True,null=True)
    gender = models.CharField(max_length=20,blank=True,null=True)

    session_token  =  models.CharField(max_length=10,default=0)

    crated_at =  models.DateTimeField(auto_now_add=True)
    updated_at =  models.DateTimeField(auto_now=True)

    objects =  CustomUserManager()
    
    def __str__(self):
        return self.email
