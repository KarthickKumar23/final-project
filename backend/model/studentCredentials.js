import mongoose  from "mongoose";
 
const  studentCredentials = new mongoose.Schema({
   
        name :{
             type: String,
             required:true,

        },
        tenthMarkPercentage:{
            type:String,
            required:true,

        },
        twelthMarkPercentage:{
            type:String,
            required:true,
        },
        currentCGPA:{
            type:String,
            required:true,
        },
        resume:{
               type:String,
               required:true,
        },
        tenthMarkSheet:{
            type:String,
            required:true,
        },
        twelthMarkSheet:{
            type:String,
            required:true,
        },
        user:{
        type:mongoose.Types.ObjectId,
        ref:"student",
        required:true,
    }
});
 export default mongoose.model('StudentCredentials',studentCredentials)