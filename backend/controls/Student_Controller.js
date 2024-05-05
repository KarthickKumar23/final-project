import mongoose from "mongoose"
import StudentInfo from "../model/StudentInfo.js"
import bcrypt from 'bcryptjs';
import Users from "../model/Users.js";
import studentCredentials from "../model/studentCredentials.js";

export const signup= async (req,res,next) =>{

    const {name,email,password}=req.body;
    let existingUser;
    try{
         existingUser= await Users.findOne({email});
         if(existingUser){
            return res.status(400).json({message:"User aldready exits in the admin:${existingUser} ,Please signUP in the admin login"});
         }
         if(!existingUser){
            existingUser= await StudentInfo.findOne({email});
         }
    }catch(err){
      return console.log(err);
    }
    if(existingUser){
       return res.status(400).json({message:"User aldready Exists! Login Instead"});
    }
    const hashPassword =bcrypt.hashSync(password);
   const user= new StudentInfo({
       name,
       email,
       password:hashPassword,
    
   });
   try{
       await user.save();
   }catch(err){
       console.log(err);
   }
   return res.status(201).json({user});

};
export const login =async (req,res,next)=>{
    const{email,password}=req.body;
     let existingUser;
        try{
            existingUser= await StudentInfo.findOne({email});
        }catch(err){
        return console.log(err);
    }

    if(!existingUser){
        return res.status(404).json({message:"User does not exeist ,Please signup down"});
    }
    const isPasswordCorrect =bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(404).json({message:"incorrect Password"});
    }
    return res.status(200).json({message:"login Sucessfull",user:existingUser});
};
export const getAllUser= async (req,res,next) =>{
    let users;
    try{
         users= await StudentInfo.find();
    }catch(err){
      return  console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"no Users found"});
    }
        return res.status(200).json({users});
    
};

export const updateStudentdetails = async (req,res,next)=>{
   
    
            const{name,tenthMarkPercentage,twelthMarkPercentage,currentCGPA,resume,tenthMarkSheet,twelthMarkSheet,user}=req.body;
        let existingUser;
        try{
            existingUser=await StudentInfo.findById(user);
        }catch(err)
        {
            return console.log(err);
        }
        if(!existingUser){
            // existingUser.driveInformation=[];
            return res.status(400).json({message:"Unable to find the user by id"});
        }
        const profile =new studentCredentials({
            name,tenthMarkPercentage,twelthMarkPercentage,currentCGPA,resume,tenthMarkSheet,twelthMarkSheet,user
        });
        try{
            const session = await mongoose.startSession();
            session.startTransaction();
            await profile.save({session});
            existingUser.studentCredentials.push(profile);
            await existingUser.save({session});
            await session.commitTransaction();
        }catch (err){
           console.log(err);
           return res.status(500).json({message:"uanble to complete"});
        }
       return res.status(200).json({profile});
    };
    