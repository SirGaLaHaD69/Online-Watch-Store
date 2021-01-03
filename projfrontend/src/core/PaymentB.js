import React,{Fragment, useEffect, useState} from 'react'
import { isAuthenticated, signout } from './../auth/helper/index';
import { getToken, processPayment } from './helper/paymentHelper';
import { withRouter } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react'
import { createOrder } from './helper/orderHelper';
import { emptyCart } from './helper/cartHelper';

const PaymentB=(props)=> {


    const {products,setReload,history,reload} = props

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [clientToken, setClientToken] = useState(null)
    const [error, setError] = useState('')
    const [instance, setInstance] = useState({})

    const userId =  isAuthenticated() && isAuthenticated().user.id
    const token = isAuthenticated() && isAuthenticated().token

    useEffect(() => {
        genToken(userId,token)
        
    },[])

    const genToken=(userId,token)=>{
        getToken(userId,token)
            .then(responseData=>{
                if(responseData.Error){
                    setError(responseData.Error)
                    signout(()=>history.push('/'))
                }
                else{
                    console.log(responseData);
                    const ct = responseData.client_token
                    setClientToken(ct)
                }
            })
            .catch(e=>console.log(e))
    }

    const getNetAmount = () =>{
        let amt = 0;
        products.map((product)=>
            amt+= product.quantity*product.price
   )
        return amt;
    }
    const showDropIn  = () =>{
        return(
            <div>
                {clientToken!==null && 
                <Fragment>
                    <DropIn
                options  = {{authorization: clientToken}}
                onInstance = {(obj)=>(setInstance(obj))}
                />
            <button className='btn btn-block btn-warning' onClick = {onPurchase}>Buy Now</button>
                </Fragment>
                
            }
                
                
            </div>
        )
    }

    const onPurchase=()=>{
        setLoading(true)
        let nonce;
        let getNonce = instance.requestPaymentMethod()
            .then(data =>{
                nonce = data.nonce
                const paymentData = {
                    paymentMethodNonce : nonce,
                    amount : getNetAmount()
                }
                processPayment(userId,token,paymentData)
                    .then(responseData=>{
                        if(responseData.Error){
                            if(responseData.code === '1'){
                                console.log("Payment Failed");
                                signout(()=>{})
                            }
                        }
                        else{
                                console.log(responseData)
                                setLoading(false)
                                setSuccess(true)
                                console.log("Payment Success");
                                let product_names = []
                                products.forEach((item)=>{
                                    product_names+= item.name + ','
                                })
                                const orderData ={
                                    products: product_names,
                                    transaction_id: responseData.transaction.id,
                                    total_amount: responseData.transaction.amount
                                }
                                createOrder(userId,token,orderData)
                                    .then(response=>{
                                        if(response.Error){
                                            if(response.code==='1'){
                                                console.log("Order Failed");
                                                setSuccess(false)
                                            }
                                            signout(()=>{})
                                        }
                                        else{
                                                if(response.success){
                                                    console.log("Order Placed");
                                                }
                                        }
                                    })
                                    .catch(err=>{
                                        console.log("Order failed")
                                        setSuccess(false)
                                        setLoading(false)
                                    })
                                    emptyCart(()=>console.log("cart Empty now"))
                                    setReload(!reload)
                        }
                    })
                    .catch(err=>console.log(err))
            })
            .catch(err=>console.log(`Payment error`,err))
    }
















    return (
        <div>
            <h3>Your Bill is: Rs  {getNetAmount()}</h3>
            {showDropIn()}
        </div>
    )
}
export default withRouter(PaymentB);