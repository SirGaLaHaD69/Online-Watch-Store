import React,{useState,useEffect, Fragment} from 'react'
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/cartHelper';
import CheckoutCard from './CheckoutCard';
import PaymentB from './PaymentB';

const Cart = () =>{

    const [redirect, setRedirect] = useState(false)
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

  
    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadProducts = ()=>{
        return(
            <div >
                {products.map((product)=>{
                    return(
                        <CheckoutCard
                        key = {product.id}
                        product = {product}
                        onReload = {setReload}
                        reload = {reload}
                        />
                    )
                })}
            </div>
        )
    }
    const loadCheckout = ()=>{
       return(
        <h1>
            Checkout
        </h1>
    )}
    const bodyOfcart = () =>{
        if(!isAuthenticated())
            return <Redirect to='/signin'/>
        if(products.length===0){
            return (
                <Base title="Your Cart" description="No items in your cart...">
                </Base>
            )
        }
        return(
            <Base title="Your Cart" description="Checkout to pay">
           
                <div className="row text-center">
                    <div className="col-6">
                        {loadProducts()}
                    </div>
                    <div className="col-6">
                        <PaymentB
                            products ={products}
                            reload = {reload}
                            setReload ={setReload}
                        />
                    </div>
                    
                </div>
        </Base>
        )
    }
    return (
        <Fragment>
            {bodyOfcart()}
        </Fragment>
    )
}

export default Cart;