from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import authentication_classes,permission_classes

from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):

    def create(self,validated_data):
         password = validated_data.pop('password',None)
         instance = self.Meta.model(**validated_data)

         if password is not None:
             instance.set_password(password)
         instance.save()

         return instance

         
    def update(self,instance,validated_data):

        for key,value in validated_data:
            if key is 'password':
                instance.set_password(value)
            else:
                setattr(instance,key,value)

        instance.save()
        return instance



    class Meta:
        model =  CustomUser

        extra_kwargs = {'password':{'write_only':True}}

        fields = ('id','name','email','password','phone','gender','is_active','is_staff','is_superuser')

        