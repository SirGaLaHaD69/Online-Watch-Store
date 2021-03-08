import axios from "axios";
import {API} from '../../backend';
/**
 * 
 * @param {*} accesstoken This is the accesstoken of the user obtained from Google
 */
const googleLogin = async (accesstoken) => {
    let res = await axios.post(
      `${API}/rest-auth/google/`,
      {
        access_token: accesstoken,
      }
    );
    console.log(res);
    return await res.status;
  };

export default googleLogin;