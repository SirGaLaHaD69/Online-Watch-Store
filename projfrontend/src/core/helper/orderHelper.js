import { API } from './../../backend';

export const createOrder = (userId,token,orderData) =>{
    const formData = new FormData()
    
    for ( const key in orderData ){
        formData.append(key,orderData[key])
    }

    return fetch(`${API}order/add/${userId}/${token}/`, {
            method: "POST",
            body: formData
        })
        .then(response=>response.json())
        .catch(err=>console.log("[POST] request error to Order API: ",err))
     
    
}