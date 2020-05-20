const { buzz } = require("./model");
const { ResourceNotFound,ServerError} = require("../ErrorHandler/genericExceptions");
const {DataValidationFailed}=require('../ErrorHandler/buzzExceptions');
const buzzService=require('./services');

module.exports.createBuzz = (req, res,next) => {
  console.log("Images=====>",req.files,"Ending");
  const paths=[];
  if(req.files){
  req.files.forEach(path=>{
    paths.push(path.path);
  })}
  const myuserdata = req.data;
  try {
    let buzzFeed = req.body;
    let newPost = new buzz({
      description: buzzFeed.description,
      category: buzzFeed.category,
      userId: myuserdata.data.email,
      images:paths
    });
    newPost.save(function (err, buzzFeed) {
      if (err) {
        return next(new DataValidationFailed(err.message,401,err.errors));
      } else
        res.send({
          message: "New post added",
          success: true,
          buzz: buzzFeed,
        });
    });
  } catch (err) {
    return next( new ServerError("Error",500));
  }
};

module.exports.getAll = async (req, res,next) => {
  try {
    const skipCount=req.query.skip;
    const response = await buzzService.getAll(Number(skipCount));
    res.send(response);
  } catch (err) {
    return next( new ServerError("Error",500));
  }
};

module.exports.updateLikes = async (req, res) => {
  try {
    const response = await buzzService.updateLikesorDislikes(req.params, true,req.query.reverse);
    res.send(response);
  } catch (err) {
    return next(new ServerError("Error",500));
  }
};

module.exports.updateDislikes = async (req, res) => {
  try {
    const response = await buzzService.updateLikesorDislikes(req.params, false,req.query.reverse);
    res.send(response);
  } catch (err) {
    return next(new ServerError("Error",500));
  }
};

module.exports.handleUnknownRequests = (req, res, next) => {
  return next(new ResourceNotFound("requested resource not found", 404));
};
