import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Drive from './Drive';

const UserDrives = () => {
  const [user, setUser] = useState([]);
  const id=localStorage.getItem('userId');
  const sendRequest= async () =>{
    const res= await axios.get(`http://localhost:5000/driveDetails//user/${id}`).catch((err)=>console.log(err));
    const data=await res.data;
    return data;

  };
  useEffect(()=>{
    sendRequest().then((data)=>setUser(data.user));

  },[]);
  console.log(user);
  return (
    <div>
      {" "}{ user && user.driveInformation&& user.driveInformation.map((drive,index)=>(<Drive key={index} id={user._id} isUser={true} title={drive.title} description={drive.description} imageURL={drive.image} userName={user.name} form={drive.form}/>))}</div>
  )
}

export default UserDrives