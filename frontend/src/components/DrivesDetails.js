import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'

const DrivesDetails = () => {
  const navigate =useNavigate();
  const id= useParams().id;
  const [drive, setDrives] = useState()
  const fetchDetails =async ()=>{
    const res =await axios.get(`http://localhost:5000/driveDetails/${id}`).catch((err)=>console.log(err));
    const data =res.data;
    return data;
  }

  const sendRequest= async () =>{
       const res = await axios.put(`http://localhost:5000/driveDetails/update/${id}`,{
        title:inputs.title,
        description:inputs.description,
        form:inputs.form
       }).catch((err)=>console.log(err));
       const data =await res.data;
       return data;
  }

  console.log(id);
  
  useEffect(()=>{
   fetchDetails().then(data=>{setDrives(data.drive)
  setInputs({title:data.drive.title,description:data.drive.description,image:data.drive.image,form:data.drive.form})});
  },[id]);


  console.log(drive);
  const [inputs, setInputs] = useState({
    
   });


   const labelStyles={mb:1,mt:2,fontSize:'24px',fontWeight:'bold'};


   const handleChange=(e)=>{
     setInputs((prevState)=>({
       ...prevState,
       [e.target.name]:e.target.value,
     }));
   };


 
    
 
   const handleSubmit=(e)=>{
            e.preventDefault();
            console.log(inputs);
            sendRequest().then(data => console.log(data)).then(()=>navigate('/myDrives'));
   }
  return (
    <div>{inputs &&<form onSubmit={handleSubmit}>
    <Box border={3} borderColor='linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(36,36,162,1) 40%, rgba(0,212,255,1) 100%)' borderRadius={10}boxShadow='10px 10px 20px #ccc' padding={3} margin={'auto'} marginTop={3} display='flex' flexDirection={'column'} width={'80%'}>
      <Typography fontWeight={'bold'} padding={3} color='grey' variant='h2' TextAlign={'center'}>
        Post Your Drive
        <InputLabel sx={labelStyles}>Title</InputLabel>
        <TextField name='title' onChange={handleChange}
        value={inputs.title} margin='normal' variant='outlined'  />
        <InputLabel sx={labelStyles}>Description</InputLabel>
        <TextField name='description' onChange={handleChange} value={inputs.description} margin='normal' variant='outlined'  />  
       
      
          <InputLabel sx={labelStyles}>form 
          Link</InputLabel>
        <TextField name='form' onChange={handleChange}  value={inputs.form} margin='normal' variant='outlined'  />

      </Typography>
      <Button sx={{mt:2 ,borderRadius:4}} variant='contained' color='warning' type='submit'>submit</Button>
    </Box>
    </form>}</div>
  )
}

export default DrivesDetails