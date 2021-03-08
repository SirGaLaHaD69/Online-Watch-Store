import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import googleLogin from "./helper/googleLogin"
import { authenticate } from './../auth/helper/index';

class GoogleSignin extends Component {

  render() {
    const responseGoogle = async(response) => {
      console.log(response);
      let googleID = response.googleId
      let googleResponse  = await googleLogin(response.accessToken);
      console.log("ended");
      console.log(googleResponse);
      if(googleResponse===200){
        authenticate(googleID);
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

      </div>
    );
  }
}

export default GoogleSignin;