import mongoose from "mongoose";
import Users from "../model/Users.js";
import driveInformation from "../model/driveInformation.js";


export const driveInfo= async (req,res,next)=>{
    

    let driveDetails;
    try{
        driveDetails=await driveInformation.find().populate('user');
    }catch(err){
        return console.log(err);
    }
    if(!driveDetails){
        return res.status(404).json({message:"No upcoming Drives"});
    }
    return res.status(200).json({driveDetails});
};
export const addDrives = async(req,res,next)=>{
    const{title,description,image,user,form}=req.body;
    let existingUser;
    try{
        existingUser=await Users.findById(user);
    }catch(err)
    {
        return console.log(err);
    }
    if(!existingUser){
        // existingUser.driveInformation=[];
        return res.status(400).json({message:"Unable to find the user by id"});
    }
    const drive =new driveInformation({
        title,
        description,
        image,
        user,
        form,
    });
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await drive.save({session});
        existingUser.driveInformation.push(drive);
        await existingUser.save({session});
        await session.commitTransaction();
    }catch (err){
       console.log(err);
       return res.status(500).json({message:"uanble to complete"});
    }
   return res.status(200).json({drive});
};

// export const updateDrives= async (req,res,next)=>{
//     const {title,description,form}=req.body;
//     const driveId=req.params.id;
//     console.log(driveId);
//     let drive;
//     try{ 
//         drive =await driveInformation.findById(driveId,{
//             title,  
//             description,
//             form
//     })
// }catch(err){
//     console.log(err + "hdeb");
//     return console.log(err);
// }
// console.log(drive);
// if(!drive){
//     return res.status(500).json({message:"Unable to update the drive"});
// }
//   res.status(200).json({drive});
// };

export const updateDrives = async (req, res, next) => {
    const { title, description, form } = req.body;
    const driveId = req.params.id;
    
    try {
        const updatedDrive = await driveInformation.findByIdAndUpdate(driveId, {
            title,
            description,
            form
        }, { new: true }); // { new: true } option returns the modified document

        if (!updatedDrive) {
            return res.status(404).json({ message: "Drive not found" });
        }

        res.status(200).json({ drive: updatedDrive });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update drive" });
    }
};
export const getById =async(req,res,next)=>{
    const id=req.params.id;
    let drive;
    try{
        drive= await driveInformation.findById(id);
    }catch(err){
        return console.log(err);
    }
    if(!drive)
      {
        return res.status(404).json({message:"id not found"});

      }
      return res.status(200).json({drive});
};
export const deleteDrive=async(req,res,next) =>{
    const id=req.params.id;
   
    let drive;
    try{
        drive= await driveInformation.findByIdAndDelete(id).populate("user");
        await drive.user.driveInformation.pull(drive);
        await drive.user.save();


    }catch(err){
        return console.log(err);
    }
    if(!drive){
        return res.status(404).json({message:"Unable to update"});
    }
    return res.status(200).json({message:"deleted sucessfully"});
};
export const getUserId =async (req,res,next)=>{
    const userId=req.params.id;
    let userDrive;
    try{
        userDrive=await Users.findById(userId).populate('driveInformation');

    }catch(err){console.log(err);}
    if(!userDrive){
        return res.status(404).json({message:"No drive found"});
    }
    return res.status(200).json({user:userDrive});
};
