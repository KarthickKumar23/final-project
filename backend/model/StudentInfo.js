import  mongoose from "mongoose";
const Schema=mongoose.Schema;

const Student=new Schema({
    name :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },   studentCredentials:[{type:mongoose.Types.ObjectId,
        ref:"StudentCredentials",
        required:true
    }],

});
export default mongoose.model("student",Student);