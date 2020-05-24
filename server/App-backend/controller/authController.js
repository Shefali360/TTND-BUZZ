const axios = require("axios");
const dotenv = require("dotenv");  
const {invalidTokenCodeError,invalidTokenError}=require('../../ErrorHandler/auth/authExceptions');
const {ResourceNotFound}=require('../../ErrorHandler/generic/genericExceptions');
const {RequiredFieldAbsent}=require('../../ErrorHandler/validation/validationExceptions');

dotenv.config();

module.exports.handleAuthTokenRequest = async (req, res,next) => {
  try {
    const token = await axios({
      url: 'https://oauth2.googleapis.com/token',
      method: "post",
      data: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: "http://localhost:3000/authToken",
        grant_type: "authorization_code",
        code: decodeURIComponent(req.params["code"]),
      },
    });
    console.log(token['data']);
    res.send(token['data']);
  } catch (err) {
  return next(new invalidTokenCodeError("Invalid code for token access request",401,err.response.data));
  }
};

module.exports.handleRefreshAuthTokenRequest = async (req, res,next) => {
  if(!req.body || !req.body['refreshToken'])
  return next(new RequiredFieldAbsent('refresh token is not present', 400));
  try {
    const token = await axios({
      url: 'https://oauth2.googleapis.com/token',
      method: "post",
      data: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: req.body["refreshToken"]
      },
    });
    console.log(token['data']);
    res.send(token['data']);
  } catch (err) {
    return next(new invalidTokenError("Invalid refresh token received",401,err.response.data));
  }
  
};


module.exports.handleLogout = async (req, res,next) => {
  if(!req.body || !req.body['refreshToken'])
  return next(new RequiredFieldAbsent('refresh token is not present', 400));
  try {
   await axios({
      url: 'https://oauth2.googleapis.com/revoke'+`?token=${encodeURIComponent(req.body['refreshToken'])}`,
      method: "post",
    });
    res.send({"success":true});
  } catch (err) {
    next(new invalidTokenError("Invalid token received or token has been expired",401,err.response.data));
    console.log(err);
  }
  
};

module.exports.handleUnknownRequests=(req, res, next)=> {
  return next(new ResourceNotFound('requested resource not found', 404));
}
