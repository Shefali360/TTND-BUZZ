const {buzz}=require('./model');  
const {ResourceNotFound}=require('../ErrorHandler/genericExceptions');
const {CustomExceptionts}=require('../ErrorHandler/exceptionModel');
const {RequiredFieldAbsent}=require('../ErrorHandler/validationExceptions');

module.exports.createBuzz=(req,res)=>{
    const mydata=req.data;
    console.log(mydata);
    // try{
      let buzzFeed=req.body;
      let newPost=new buzz({
        description:buzzFeed.description,
        category:buzzFeed.category,
        // userId:mydata.email
      })
      console.log(newPost);
      newPost.save(function(err, buzzFeed){
        if(err)
           res.send({message: "Database error", type: "error"});
        else
           res.send({
              message: "New person added", type: "success", buzz: buzzFeed});
     });
    // }catch(err){
    //   res.send({error:true})
    // }
  }

  module.exports.handleUnknownRequests=(req, res, next)=> {
    return next(new ResourceNotFound('requested resource not found', 404));
  }