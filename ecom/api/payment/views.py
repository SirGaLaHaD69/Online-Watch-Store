
# Create your views here.

from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt


import braintree


import braintree


gateway = braintree.BraintreeGateway(
  braintree.Configuration(
    environment=braintree.Environment.Sandbox,
    merchant_id='cxgsh8nb58j9k44v',
    public_key='k8kpn2c2j56368xr',
    private_key='393836df266f09db00a8c2518d4b057a'
  )
)

def validate_user_token(id,token):
    UserModel =  get_user_model()

    try:
        user =  UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False

@csrf_exempt
def generate_token(request,id,token):
    if not validate_user_token(id,token):
        return JsonResponse({'Error':'Invalid Session,Kindly Login Again'})

    # pass client_token to your front-end
    client_token = gateway.client_token.generate()
    return JsonResponse({'client_token':client_token,'Success':True})


@csrf_exempt
def process_payment(request,id,token):
    if not validate_user_token(id,token):
        return JsonResponse({'Error':'Invalid Session,Kindly Login Again'})

    nonce_from_the_client = request.POST.get('paymentMethodNonce')
    amount_from_the_client = request.POST.get('amount')

    result = gateway.transaction.sale({
        "amount": amount_from_the_client,
        "payment_method_nonce": nonce_from_the_client,
        "options": {
        "submit_for_settlement": True
        }
    })

    if result.is_success:
        return JsonResponse({
            'success':result.is_success,
            'transaction':{
                'id':result.transaction.id,
                'amount': result.transaction.amount
            }
        })
    else:
        return JsonResponse({'Error': True,'success': False,'msg':'Transaction Failed'})
