import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js';
import driveInfoRouter from './routes/admin-routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import Studentrouter from './routes/Student_routes.js';
// 8R6Kzu8NoC74sL99
const app=express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
 app.use('/api/user',router);
app.use('/driveDetails',driveInfoRouter);
app.use('/student',Studentrouter);

mongoose.connect('mongodb+srv://admin:8R6Kzu8NoC74sL99@atlascluster.c1rdbnf.mongodb.net/placement?retryWrites=true&w=majority&appName=AtlasCluster')
.then(()=>app.listen(5000)).then(()=>console.log('Connected to the database and running on port:5000'))
.catch((err)=>console.log(err));


