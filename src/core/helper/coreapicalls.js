import {API} from '../../backend';

export const getProduct = ()=>{
    return(
    fetch(`${API}product/`,{method: 'GET'})
    .then(response=>response.json())
    .catch(err=>console.log('Unable to fetch API ERROR: ', err))
    )
}
 export const getOrder = () =>{
    return(
        fetch(`${API}order/`,{method: 'GET'})
        .then(response=>response.json())
        .catch(err=>console.log('Unable to fetch [Order API] ERROR: ', err))
        )
 }

