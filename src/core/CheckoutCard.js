import React from 'react'
import { removeItemFromCart } from './helper/cartHelper'
export default function CheckoutCard({product,reload,onReload}) {

    const calculateIndividualPrice =() =>{
        return(
            product.price*product.quantity
        )
    }

    const removeFromCart = () => {
        return (
        <button
          onClick={() => {
            removeItemFromCart(product.id)
            onReload(!reload)
          }}
          className="btn btn-danger mt-2 mb-2 ml-2 mr-2"
        >
          Remove from cart
        </button>
        )
      }

    return (
        <div className="card mb-3" style={{maxWidth: "100%"}}>
                <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={product.image} className="card-img" alt="#"/>
                </div>
                <div className="col-md-8">
                        <div className="card-body">
                        <h1 className="card-title">{product.name}</h1>
                        <p className="card-text">{product.description}</p>
                        <h3>Quantity: {product.quantity} x</h3>
                        <h3 className="p-5">Price : Rs {calculateIndividualPrice()}</h3>
                        {removeFromCart()}
                        </div>
                        
                </div>
                </div>
      </div>
    )
}
