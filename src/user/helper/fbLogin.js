import axios from "axios";

const fbLogin = async (accesstoken) => {
  let res = await axios.post(
    `https://marlin-the-watch-store.herokuapp.com/rest-auth/facebook/`,
    {
      access_token : accesstoken,
    }
  );
  console.log(res);
  return  res.status;
};

export default fbLogin;