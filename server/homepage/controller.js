const axios = require("axios");
const dotenv = require("dotenv");
const {invalidTokenGrantCodeError,invalidTokenError}=require('../ErrorHandler/authExceptions');
const {ResourceNotFound}=require('../ErrorHandler/genericExceptions');
const {CustomExceptiontemplate}=require('../ErrorHandler/exceptionModel');

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
   next(new invalidTokenGrantCodeError("Invalid code for token access request",401,err['response']['data']));
  }
};

module.exports.handleRefreshAuthTokenRequest = async (req, res,next) => {
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
    next(new invalidTokenError("Invalid refresh token received",401,err['response']['data']));
  }
  
};

module.exports.verifyTokenMiddleware=async(req, res, next)=> {
  const accessToken = req.headers['authorization'].split(' ')[1];
  
  try{
      const verificationResponse = await axios.get('https://oauth2.googleapis.com/tokeninfo' + `?access_token=${accessToken}`);
      return next();
  } catch (err) {
    next(new invalidTokenError("Invalid refresh token received",401,err['response']['data']));
  }
}

module.exports.handleUnknownRequests=(req, res, next)=> {
  next(new ResourceNotFound('requested resource not found', 404));
}
module.exports.errorHandlingMiddleware=(err, req, res, next)=> {
  res.status(err.responseCode || 400);
  res.json({
      error: err.name,
      errorCode: err.code,
      message: err.message,
      payload: err.payload
  });
}
