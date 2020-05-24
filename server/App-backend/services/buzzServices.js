const buzz  = require("../Models/BuzzModel");
const { ServerError} = require("../../ErrorHandler/generic/genericExceptions");
const {DataValidationFailed}=require('../../ErrorHandler/buzz/buzzExceptions');

module.exports.createBuzz=async(data)=>{
  const buzzFeed=new buzz(data);
 try{
  await buzzFeed.save();
  return buzzFeed;
 } 
 catch(err){
    if (err.name === 'ValidationError')
            {throw new DataValidationFailed(err.message, 400);}
    else
            {throw new ServerError("Error",500);}
 
}
}

module.exports.getAll = async (limit,skip) => {
  const allBuzz = await buzz.find().limit(limit?limit:0).skip(skip?skip:0);
  return allBuzz;
};

module.exports.updateLikesorDislikes= async ({ id }, likes, reverse) => {
 try{ if (likes) {
    await buzz.findByIdAndUpdate(id, {
      $inc: {
        likes: reverse ? -1 : 1,
      },
    });
  } else {
      await buzz.findByIdAndUpdate(id,{
          $inc:{
            dislikes:reverse?-1:1
          }
      })
  }
}catch(err){
    console.log(err);
}
};
