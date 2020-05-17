const axios=require("axios");
const dotenv=require("dotenv");

dotenv.config();

module.exports.handleAuthTokenRequest=async(req,res)=> {
  const { data } = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id:process.env.CLIENT_ID,
      client_secret:process.env.CLIENT_SECRET,
      redirect_uri: 'http://localhost:3000/auth/google/callback',
      grant_type: 'authorization_code',
      code: process.env.CLIENT_CODE
    },
  });
  console.log(data); // { access_token, expires_in, token_type, refresh_token }
  return data.access_token;
};



