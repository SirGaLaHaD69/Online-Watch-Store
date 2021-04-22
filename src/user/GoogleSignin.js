import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import googleLogin from "./helper/googleLogin";
import { authenticate } from './../auth/helper/index';
import fbLogin from './helper/fbLogin';

class GoogleSignin extends Component {

  render() {
    const responseGoogle = async(response) => {
      console.log(response);
      let googleID = response.googleId
      let googleResponse  = await googleLogin(response.accessToken);
      console.log("ended");
      console.log(googleResponse);
      if(googleResponse===200){
        let allUsers = getAllUsers();
        const googleUser = getAllUsers.filter(e=>e.email===response.profileObj.email)
        const browserToken = {
              "user" : googleUser,
              "token": response.accessToken
        }
        authenticate(browserToken);
      }
    }
    const getAllUsers =()=>{
      return fetch(`${API}user/`,{
        method: "GET",
    })
    .then(response=>response.json())
    .catch(err=>console.log(err))
    }
    const responseFacebook = async (response) => {
      console.log(response);
      let fbId = repsonse.userID;
      let fbResponse  = await fbLogin(response.accessToken);
      console.log("ended");
      console.log(fbResponse);
      if(fbResponse===200){
        authenticate(fbId);
      }
    }


    return (
      <div className="App">

        <GoogleLogin
          clientId="994732738453-i7nsteu16ub91els1r4l753nfnagaf0s.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        <br/>
        <br/>
        <FacebookLogin
          appId="226280195908296"
          fields="name,email,picture"
          callback={responseFacebook}
        />
        <br />
        <br />

      </div>
    );
  }
}

export default GoogleSignin;