
import { API } from '../../backend';

export const getToken = (userId,token) =>{

    return fetch(`${API}payment/gen_token/${userId}/${token}/`)
    .then(response=>response.json())
    .catch(e=>console.log('[GET] request from Generate Token :',e))

}

export const processPayment =  (userId,token,paymentInfo) =>{

    const formData =  new FormData();

    for ( const key in paymentInfo){
        formData.append(key,paymentInfo[key])
    }

    return fetch(`${API}payment/process-payment/${userId}/${token}/`,{
        method:"POST",
        body:formData
    })
    .then(response=>response.json())
    .catch(e=>console.log('[POST] request to payment API failed: ',e))
}
