from django.shortcuts import render
import random
# Create your views here.
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializer import UserSerializer
from .models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login,logout
from django.core.validators import validate_email


from django.core.exceptions import ValidationError




def  generate_session_token(length=10):
    return ''.join(  [  random.choice([chr(ch) for ch in range(97,123)]+[str(i) for i in range(10)])  for _ in range(length) ]     )
    
@csrf_exempt
def signin(request):

    if request.method != 'POST':
        return JsonResponse({'Error':'Send a POST request with valid parameters'})

    username = request.POST.get('email')
    password = request.POST.get('password')

    try :
        validate_email(username)
    except ValidationError as e:
        return JsonResponse({'Error': e})
    
    UserModel =  get_user_model()

    try:
        user = UserModel.objects.get(email=username)
        if user.check_password(password):
            usr_dict = UserModel.objects.filter(email=username).values()[0]
            usr_dict.pop('password')

            if user.session_token is not '0':
                user.session_token = '0'
                user.save()
                return JsonResponse({'Error': 'Previous session Exists'})


            token =  generate_session_token()
            user.session_token = token
            user.save()
            login(request,user)
            return  JsonResponse({'token':token,'user':usr_dict})
        else:
            return JsonResponse({'Error':'Invalid Credentials'})
    except UserModel.DoesNotExist:
        return JsonResponse({'Error':'Invalid Email, User Not Found !!'})

def signout(request,id):
    logout(request)

    UserModel =  get_user_model()

    try:
        user =  UserModel.objects.get(pk=id)
        user.session_token='0'
        user.save()
    except UserModel.DoesNotExist:
        return JsonResponse({'Error':'Invalid User-Id'})
    
    return JsonResponse({'Success': 'Logout Successful'})


class UserViewSet(viewsets.ModelViewSet):

    permission_classes_by_action = {'create':  [AllowAny] }

    serializer_class = UserSerializer
    queryset =  CustomUser.objects.all().order_by('id')


    def get_permissions(self):
        try:
            # return permission_classes depending on `action` 
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError: 
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]
