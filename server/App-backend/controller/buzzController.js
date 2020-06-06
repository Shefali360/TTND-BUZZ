const { ResourceNotFound,ServerError} = require("../../ErrorHandler/generic/genericExceptions");
const buzzService=require('../services/buzzServices');

module.exports.createBuzz = async(req, res,next) => {
  const paths=[];
  if(req.files){
  req.files.forEach(path=>{
    paths.push(path.path);
  })}
  req.body.images=paths;
  req.body.createdOn=Date.now();
  const myuserdata = req.data;
  req.body.userId=myuserdata.data.email;
  try{
    const response=await buzzService.createBuzz(req.body);
    res.send(response);
  }
  catch (err) {
   next(err);
  }
};



module.exports.getAll = async (req, res,next) => {
  try {
    const limitCount=req.query.limit;
    const skipCount=req.query.skip;
    console.log(limitCount);
    const response = await buzzService.getAll(Number(limitCount), Number(skipCount));
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

module.exports.delete = async (req, res) => {
  try {
    const response = await buzzService.delete();
    res.send(response);
    
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.handleUnknownRequests = (req, res, next) => {
  return next(new ResourceNotFound("requested resource not found", 404));
};

