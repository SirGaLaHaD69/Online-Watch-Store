import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import googleLogin from "./helper/googleLogin"

class GoogleSignin extends Component {

  render() {
    const responseGoogle = async(response) => {
      console.log(response.accessToken)
      let googleResponse  = await googleLogin(response.accessToken);
      console.log("ended");
      console.log(googleResponse);
      console.log(response);
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