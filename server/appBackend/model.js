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
    type:String
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
  },
  createdOn:{
    type:Number,
    default:Date.now()
  }
});

const adminSchema=new Schema({
    email:{
        type:String,
        lowercase:true,
        required:true,
        match:'/\S+@\S+\.\S+/'
    }
})
const complaintSchema=new Schema({
      department:{
        type:String,
        enum:['Admin','IT','HR','Infra'],
        default:'Admin'
      },
      issue:{
        type:String,
        enum:['Hardware','Infrastructure','Others'],
        default:'Hardware'
      },
      name:{
        type:String,
        required:true
      },
      email:{
        type:String,
        lowercase:true,
        required:true,
        match:'/\S+@\S+\.\S+/'
      },
      concern:{
        type:String,
        required:true
      },
      file:[{
        type:String
      }],
      status:{
        type:String,
        enum:['Open','In Progress','Closed'],
        default:'Open'
      },
      estimatedTime:{
        value:{
          type:Number,
          required:true
        },
        timeType:{
          type:String,
          enum:['hours','days','weeks'],
          default:'hours',
          required:true
        }
      }
})


const buzz= mongoose.model("Buzz", buzzSchema);
const admin=mongoose.model("Admin",adminSchema);
const complaint=mongoose.model("Complaints",complaintSchema);

module.exports = {
  buzz,
  admin,
  complaint
};
