import express from "express";
import { signup,login,getAllUser,updateStudentdetails } from "../controls/Student_Controller.js";

const Studentrouter=express.Router();

Studentrouter.post("/signup",signup);
Studentrouter.post('/login',login);
Studentrouter.get('/getAllStudent',getAllUser);
Studentrouter.post('/updateProfile',updateStudentdetails);


export default Studentrouter;