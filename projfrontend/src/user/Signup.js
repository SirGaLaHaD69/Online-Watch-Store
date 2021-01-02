import React from 'react'
import Base from './../core/Base';
import {useState} from 'react'
import { signup } from './../auth/helper/index';

export default function Signup() {

    const [values, setValues] = useState({
        name:"",
        email:"",
        password:"",
        success:false
    })
    const [emailError, setEmailError] = useState('')
    const [nameError, setNameError] = useState('')

    const {name,email,password,success}=values;

    // HOF for setValue()
    const stateChangeHandler= state => event => setValues( values =>{
        return(
            {...values,[state]:event.target.value}
        
    )})
        
    const resetValues =(successful)=>{
        setValues({
            email:"",
            name:"",
            password:"",
            success:successful
        })
    }

    const successMessage = () =>{
        return(
            <div className="row">
                <div className="col-md-4 offset-sm-4 text-left">
                    <div className="alert alert-success" style= {{display:success?"":"none"}}>
                    New Account Created Successfully.Please Login!
                    </div>
                </div>
            </div>
        )
    }
    const errorMessage = (msg) =>{
        return(
            <div className="row">
                <div className="col text-left">
                    <div className="alert alert-warning">
                   {msg}
                   </div>
                </div>
            </div>
        )
    }



    const onSubmitHandler = (event)=>{
        event.preventDefault()
        signup({name,email,password})
        .then(responseData=>{
            let succ=true;
            if(responseData.email!==email){
                setEmailError(responseData.email)
                succ=false;
            }
            if(responseData.name!==name){
                setNameError(responseData.name)
                succ=false;
            }
            resetValues(succ);
            
            
        })
        .catch(err=>alert(err))
    }

    const SignupForm = () => {
        return(
            <div className="row">
                <div className="jumbotron col-md-4 offset-sm-4 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-dark">Name</label>
                                <input 
                                type="text" 
                                className="form-control"
                                value = {name}
                                required
                                onChange = {stateChangeHandler("name")}
                                />
                            {nameError && errorMessage(nameError)}
                        </div>
                        <div className="form-group">
                            <label className="text-dark">Email</label>
                                <input 
                                type="email" 
                                className="form-control"
                                value = {email}
                                required
                                onChange = {stateChangeHandler("email")}
                                />
                            {emailError && errorMessage(emailError)}
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
                        onClick ={onSubmitHandler}
                        className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <Base title = "Signup" description = "Signup to buy these awesome tees">
        {successMessage()}
        {SignupForm()}
        </Base>
    )
}
