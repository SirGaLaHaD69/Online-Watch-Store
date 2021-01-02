import React ,{useState} from 'react';
import ImageHelper from "./helper/imageHelper";
import './core.css'
import {addItemToCart,removeItemFromCart} from './helper/cartHelper'
import { isAuthenticated } from '../auth/helper';
import { withRouter } from 'react-router-dom';



const Card = ({ product,addtocart=true,removefromcart=true,history}) => {

    const [quantity, setQuantity] = useState(1)

    const addToCart = ()=>{
      if(isAuthenticated()){
        addItemToCart(product,quantity,()=>{})
        console.log('Authenticated User,Item added to cart');
      }
      else
        console.log("Login Please");

        history.push('/cart')
    }


    // const redirectUser = (redirect) =>{
    //     if (redirect){
    //       return <Redirect to='/cart'/>
    //     }
    // }


    const showAddToCart = addtocart =>{
      return addtocart && (
        <button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
      )
    }


   

    const decrementQuantity = ()=>{
        if(quantity>1){
          setQuantity((prevQuantity)=>prevQuantity-1)
        }
    }
    const incrementQuantity = ()=>{
          setQuantity((prevQuantity)=>prevQuantity+1)
    }
    return (
      
      <div className="card text-white  border border-dark " >
        <div className="card-header lead">{product.name}</div>
        <div className="card-body">
          <ImageHelper product = {product}/>
          <p className="lead  rounded bg-info font-weight-normal text-wrap text-center">
            {product.description}
          </p>
          
					<h4>Quantity:</h4>
					<fieldset>
						<input type="text" name="quantity" value={quantity} readOnly='readonly'/>
            <i className="fa fa-caret-left m-2 btn-lg dec" aria-hidden="true" onClick={decrementQuantity}></i>
            <i className="fa fa-caret-right m-2 btn-lg inc" aria-hidden="true" onClick = {incrementQuantity}></i>
					</fieldset>
				
          <p className="btn btn-secondary rounded btn-sm px-4">$ {product.price}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCart(addtocart)}
            </div>
            {/* <div className="col-12">
              {removeFromCart(removefromcart)}
            </div> */}
          </div>
        </div>
      </div>
    );
  };

export default withRouter(Card);

