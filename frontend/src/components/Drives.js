import React, { useEffect,useState } from 'react'
  import axios from 'axios'
import Drive from './Drive';
const Drives = () => {
  const [drives, setDrives] = useState([]);
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
    <div>{ drives && drives.driveDetails&& drives.driveDetails.map((drive,index)=>(<Drive key={index} 
      id={drive._id}
      isUser ={localStorage.getItem('userId')===drive.user._id}title={drive.title} description={drive.description} imageURL={drive.image} userName={drive.user.name} form={drive.form}/>))}</div>
  )
}

export default Drives