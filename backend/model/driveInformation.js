import mongoose  from "mongoose";

const Schema =mongoose.Schema;

const driveSchema=new Schema({

    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
       type:String,
       required:false,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    form:{
        type:String,
        required:true,
    }
});

export default mongoose.model("driveInfo",driveSchema);