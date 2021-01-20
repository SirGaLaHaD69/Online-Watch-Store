import React ,{useState}from 'react'
import Base from '../core/Base'
import { signin, authenticate, isAuthenticated } from '../auth/helper/index';
import { Redirect } from 'react-router-dom';

export default function Signin() {

    const [values, setValues] = useState({
        email:"black_marlin@gmail.com",
        password:"MorganStanley",
    })
    const {email,password}=values;
    const [loadingmessage, setloadingmessage] = useState(false)
    const [didRedirect, setDidRedirect] = useState(true)
    const [error, setError] = useState('')

   
    
    const onSubmitHandler =(event) =>{
        event.preventDefault()
        setDidRedirect(false)
        signin({email,password})
            .then(responseData=>{
                console.log("Response Data after signin: ", responseData);
                if(responseData.token){
                    authenticate(responseData,()=>{
                        console.log("token added to local storage");
                        setError('')
                        setloadingmessage(true);
                        setTimeout(()=>setDidRedirect(true),2000)
                        
                    })
                }
                else{
                    setloadingmessage(false)
                    setDidRedirect(false)
                    if(responseData.Error){
                        setError(responseData.Error)
                    }
                }
            })
            .catch(err => console.log("Signin Form Submit error",err))

    }
    const redirectAfterSignin = () =>{
        if(isAuthenticated() && didRedirect){
            return <Redirect to='/'/>
        }
    }
    const LoadingMessage = () =>{
        return (
            loadingmessage && (
                <div className="col-4 alert alert-info offset-4">
                    <h2>Redirecting to Home Page</h2>
                </div>
            )
        )

    }
  
    const errorMessage = () =>{
        return(
            <div className="row">
                <div className="col-4 offset-4">
                    <div className="alert alert-warning">
                   {error}
                   </div>
                </div>
            </div>
        )
    }
    const stateChangeHandler= state => event => setValues( values =>{
        return(
            {...values,[state]:event.target.value}
        
    )})
    const SigninForm = () => {
        return(
            <div className="row">
                <div className="jumbotron col-md-4 offset-sm-4 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-dark">Email</label>
                                <input 
                                type="email" 
                                className="form-control"
                                value = {email}
                                required
                                onChange = {stateChangeHandler("email")}
                                />
                        </div>
                        <div className="form-group">
                            <label className="text-dark">Password</label>
                                <input 
                                type="password" 
                                className="form-control"
                                value = {password}
                                required
                                onChange = {stateChangeHandler("password")}
                                />
                        </div>
                        <button 
                        onClick = {onSubmitHandler}
                        className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="Login to Marlin Tees" description = "Signin to Continue Shopping">
        {error && errorMessage()}
        <LoadingMessage/>
        {SigninForm()}
        {redirectAfterSignin()}
        </Base>
    )
}
