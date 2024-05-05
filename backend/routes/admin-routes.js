import express from 'express';
import { driveInfo,addDrives, updateDrives, getById, deleteDrive, getUserId } from '../controls/drive_info_Controller.js';
const driveInfoRouter =express.Router();

driveInfoRouter.get("/",driveInfo);
driveInfoRouter.post("/add",addDrives);
driveInfoRouter.put("/update/:id",updateDrives);
driveInfoRouter.get("/:id",getById);
driveInfoRouter.delete("/:id",deleteDrive);
driveInfoRouter.get("/user/:id",getUserId);
export default driveInfoRouter;