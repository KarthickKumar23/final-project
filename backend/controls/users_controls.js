import Users from '../model/Users.js'
import bcrypt from 'bcryptjs';
import StudentInfo from '../model/StudentInfo.js'
export const getAllUser= async (req,res,next) =>{
    let users;
    try{
         users= await Users.find();
    }catch(err){
      return  console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"no Users found"});
    }
        return res.status(200).json({users});
    
};
export const signup= async (req,res,next) =>{
         const {name,email,password}=req.body;
         
         let existingUser;
         try{

       existingUser= await Users.findOne({email});

    
   

         }catch(err){
           return console.log(err);
         }
         if(existingUser){
            // alert(`User aldready Exists! Login Instead`)
            return res.status(400).json({message:"User aldready Exists! Login Instead"});
         }
         const hashPassword =bcrypt.hashSync(password);
        const user= new Users({
            name,
            email,
            password:hashPassword,
            driveInformation:[]
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
            existingUser= await Users.findOne({email});
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