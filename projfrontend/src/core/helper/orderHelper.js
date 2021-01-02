import { API } from './../../backend';

export const createOrder = (userId,token,orderData) =>{
    const formData = new FormData()
    
    for ( const key in orderData ){
        formData.append(key,orderData[key])
    }

    try {
        const response = await fetch(`${API}order/add/${userId}/${token}/`, {
            method: "POST",
            body: formData
        });
        return await response.json();
    } catch (e) {
        return console.log("[POST] request to Order API Failed: ", e);
    }

}