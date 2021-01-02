import React,{Fragment, useEffect, useState} from 'react'
import { isAuthenticated, signout } from './../auth/helper/index';
import { getToken } from './helper/paymentHelper';
import { withRouter } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react'

const PaymentB=(props)=> {


    const {products,setReload,history} = props

    // const [loading, setLoading] = useState(false)
    // const [success, setSuccess] = useState(false)
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
            <button className='btn btn-block btn-warning'>Buy Now</button>
                </Fragment>
                
            }
                
                
            </div>
        )
    }
    return (
        <div>
            <h3>Your Bill is: Rs  {getNetAmount()}</h3>
            {showDropIn()}
        </div>
    )
}
export default withRouter(PaymentB);