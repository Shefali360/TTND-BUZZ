const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buzzSchema = new Schema({
  description: {
    type:String,
    required: true,
  },
  category: {
    type:String,
    enum:['Activity buzz','Lost and Found buzz'],
    default:'Activity buzz',
  },
  images:[{
    type:String,
    data:Buffer
  }],
  likes: {
    type: Number,
    default:0
  },
  dislikes:{
      type:Number,
      default:0
  },
  userId:{
      type:String,
      required:true,
      lowercase:true,
      immutable:true
  },
  createdOn:{
    type:Number,
    default:Date.now()
  }
});

const buzz= mongoose.model("Buzz", buzzSchema);

module.exports = buzz;
