import { emptyCart } from '../../core/helper/cartHelper';
import { API } from './../../backend';


export const signup = user =>{

    return fetch(`${API}user/`,{
        method: "POST",
        headers: {
            Accept : 'application/json',
            "Content-Type":'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response=>response.json())
    .catch(err=>console.log(err))
}

export const signin = user =>{
    const formData =  new FormData()
    for(const key in user ){
        formData.append(key,user[key]);
    }
    return fetch(`${API}user/login/`,{
        method:"POST",
        body: formData
    })
    .then(response=>{
        console.log("SUCCESS",response);
        return response.json()
    })
    .catch(err=>alert(err))
}

export const authenticate = (data,next) =>{
    if(typeof window !== undefined){
        localStorage.setItem('jwt',JSON.stringify(data))
        next();
    }
}

export const isAuthenticated = () =>{
    if(typeof window !== undefined){
        if(localStorage.getItem('jwt')){
            return JSON.parse(localStorage.getItem('jwt'))
        }
        else
        return false;
    }
}

export const signout = next =>{
    console.log(isAuthenticated());
    const userId = isAuthenticated() && isAuthenticated().user.id

    if(typeof window!== undefined){
        localStorage.removeItem('jwt')
        emptyCart(()=>{})

        return fetch(`${API}user/logout/${userId}`)
        .then(response=>{
            alert("Logout Successful")
            next();
        }) 
        .catch(err => alert(err))
    }
} 