import {API} from '../../backend';

export const getProduct = ()=>{
    return(
    fetch(`${API}product/`,{method: 'GET'})
    .then(response=>response.json())
    .catch(err=>console.log('Unable to fetch API ERROR: ', err))
    )
}


