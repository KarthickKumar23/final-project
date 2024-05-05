import React from 'react'
import{ useEffect,useState } from 'react'
  import axios from 'axios'
import Sdrive from './Sdrive.js'
import { Button, nativeSelectClasses } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const StudentDrives = () => {
    const [drives, setDrives] = useState([]);
    const navigate= useNavigate();
    const sendRequest=async()=>{
      const res= await axios.get('http://localhost:5000/driveDetails').catch(err=>console.log(err));
      const data =await res.data;
      return data;
    };
  
      useEffect(()=>{
                sendRequest().then((data)=>setDrives(data));
      },[]);
      console.log(drives);
  return (
    <div>
           <Button variant='contained' color='warning' marginLeft='auto' display='flex' onClick={()=>navigate('/updateProfile')}> update profile</Button>
      
      { drives && drives.driveDetails&& drives.driveDetails.map((drive,index)=>(<Sdrive key={index} 
        id={drive._id}
        isUser ={localStorage.getItem('userId')===drive.user._id}title={drive.title} description={drive.description} imageURL={drive.image} userName={drive.user.name} form={drive.form}/>))}</div>
  )
}

export default StudentDrives;