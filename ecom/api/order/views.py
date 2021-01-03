from rest_framework import viewsets
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from .serializer import OrderSerializer
from .models import Order
from django.views.decorators.csrf import csrf_exempt



# Create your views here.



class OrderViewSet(viewsets.ModelViewSet):
    queryset =  Order.objects.all().order_by('id')
    serializer_class = OrderSerializer


def validate_user_session(id,token):
    UserModel = get_user_model()

    try:
        user =  UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False


@csrf_exempt
def add(request,id,token):
    if not validate_user_session(id,token):
        return JsonResponse({'Error': 'Please Login again','code':'1'})
    
    print("DEBUG")
    if request.method == 'POST':
        user_id = id
        txn_id = request.POST.get('transaction_id')
        total_amt = request.POST.get('total_amount')
        products = request.POST.get('products')
        # remember to name it 'products' in the form

        total_pro = len(products.split(','))

        UserModel =  get_user_model()

        try:
            user =  UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return JsonResponse({'Error':'User Doesn\'t exist' })

        ordr =  Order(
            user = user,
            product_names =products,
            total_products= total_pro,
            transaction_id=txn_id,
            total_amount=total_amt
        )
        ordr.save()
        return JsonResponse({'success': True,'error': False,'msg':"Order Placed Successfully"})

