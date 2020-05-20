const { buzz } = require("./model");

module.exports.getAll = async (skip) => {
  const allBuzz = await buzz.find().limit(5).skip(skip?skip:0);
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
