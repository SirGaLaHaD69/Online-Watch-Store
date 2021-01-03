export const addItemToCart = (item,quant,next)=>{
    let cart = []
    if (typeof window!== undefined)
    {
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
            console.log('once');
        }
        cart = cart.filter((product)=>product.id!==item.id)
        cart.push({...item,quantity:quant})
        localStorage.setItem('cart',JSON.stringify(cart));
        next();
    }
    
}
export const loadCart = () =>{
    if (typeof window !== undefined){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'))
        }
        return [];
    }
}
export const removeItemFromCart = productId =>{
    let cart = []
    if( typeof window !== undefined){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart = cart.filter((item)=>item.id!==productId)
        localStorage.setItem('cart',JSON.stringify(cart))
    }

}
export const emptyCart= (next)=>{
    if( typeof window !== undefined){
        if(localStorage.getItem('cart')){
            localStorage.removeItem('cart')
        }

    }

}