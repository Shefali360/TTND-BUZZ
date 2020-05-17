const axios=require("axios");
const dotenv=require("dotenv");

dotenv.config();

module.exports.handleAuthTokenRequest=async(req,res)=> {
  try{const { data } = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id:process.env.CLIENT_ID,
      client_secret:process.env.CLIENT_SECRET,
      redirect_uri: 'http://localhost:3000/authToken',
      grant_type: 'authorization_code',
      code: decodeURIComponent(req.params['code'])
    },
  });
  console.log(data);
  res.send(data)}
  catch(err){
      console.log(err);
  }
};



