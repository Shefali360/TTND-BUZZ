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
        unique:true,
        immutable:true
    }
})
const complaintSchema=new Schema({
      issueId:{
        type:String,
        required:true
      },
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
      assignedTo:{
        type:String,
        required:true
      },
      lockedBy:{
        type:String,
        required:true
      },
      email:{
        type:String,
        lowercase:true,
        required:true
      },
      concern:{
        type:String,
        required:true
      },
      files:[{
        type:String,
        data:Buffer
      }],
      status:{
        type:String,
        enum:['Open','In Progress','Closed'],
        default:'Open'
      },
      timestamp:{
        type:Number,
        default:Date.now()
      },
      estimatedTime:{
        value:{
          type:Number,
          default:0
        },
        timeType:{
          type:String,
          enum:['hours','days','weeks'],
          default:'hours'
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
