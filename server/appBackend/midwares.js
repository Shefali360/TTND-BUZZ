const axios = require("axios");
const { InvalidFileFormat } = require("../ErrorHandler/buzzExceptions");
const {
  invalidTokenError,
  authHeadersAbsent,
  invalidAuthHeaderFormat,
  authTokenAbsent,
} = require("../ErrorHandler/authExceptions");
const { ServerError } = require("../ErrorHandler/genericExceptions");
const multer = require("multer");
const {getAdmin}=require("./adminServices");

module.exports.verifyTokenMiddleware = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      return next(
        new authHeadersAbsent("Authorization headers are absent", 401)
      );
    }
    const tokenType = req.headers["authorization"].split(" ")[0];
    if (tokenType !== "Bearer") {
      return next(
        new invalidAuthHeaderFormat("Auth token should be of bearer type", 401)
      );
    }
    const accessToken = req.headers["authorization"].split(" ")[1];
    if (!accessToken) {
      return next(new authTokenAbsent("Auth token is not provided"), 401);
    }

    try {
      await axios.get(
        "https://oauth2.googleapis.com/tokeninfo" +
          `?access_token=${accessToken}`
      );
      return next();
    } catch (err) {
      return next(
        new invalidTokenError(
          "Invalid refresh token received",
          401,
          err.response.data
        )
      );
    }
  } catch {
    return next(new ServerError("Error", 500));
  }
};

module.exports.verifyTokenToGetUserData = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      return next(
        new authHeadersAbsent("Authorization headers are absent", 401)
      );
    }
    const tokenType = req.headers["authorization"].split(" ")[0];
    if (tokenType !== "Bearer") {
      return next(
        new invalidAuthHeaderFormat("Auth token should be of bearer type", 401)
      );
    }
    const idToken = req.headers["authorization"].split(" ")[1];
    if (!idToken) {
      return next(new authTokenAbsent("Auth token is not provided"), 401);
    }
    try {
      req.data = await axios.get(
        "https://oauth2.googleapis.com/tokeninfo" + `?id_token=${idToken}`
      );
      return next();
    } catch (err) {
      return next(
        new invalidTokenError(
          "Invalid id token received",
          401,
          err.response.data
        )
      );
    }
  } catch {
    return next(new ServerError("Error"), 500);
  }
};

module.exports.imageStorage = multer.diskStorage({
  destination: function (req, files, callback) {
    callback(null, "./Images/");
  },
  filename: function (req, files, callback) {
    callback(null, new Date().toISOString() + files.originalname);
  },
});

module.exports.fileStorage = multer.diskStorage({
  destination: function (req, files, callback) {
    callback(null, "./Attachments/");
  },
  filename: function (req, files, callback) {
    callback(null, new Date().toISOString() + files.originalname);
  },
});

module.exports.imageFileFilter = (req, files, callback) => {
  if (
    files.mimetype === "image/jpeg" ||
    files.mimetype === "image/png" ||
    files.mimetype === "image/jpg"
  ) {
    callback(null, true);
  } else {
    callback(new InvalidFileFormat("Please insert images only",400),false);
  }
};

module.exports.checkAdminPrivileges= async (req,res,next)=>{
  const userEmail=req.data.data.email;
  const adminResponse = await getAdmin(userEmail);
  if(adminResponse){
    return next();
  }else{
    res.json({"error":"Not admin"});
  }

}

module.exports.errorHandlingMiddleware = (err, req, res, next) => {
  res.status(err.responseCode || 400);
  res.json({
    error: err.name,
    errorCode: err.code,
    message: err.message,
    payload: err.payload,
  });
};
