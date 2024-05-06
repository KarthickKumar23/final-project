import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'

const DrivesDetails = () => {
  const navigate =useNavigate();
  const id= useParams().id;
  const[drive,setDrives]=useState();
  const[title,setTitle]=useState('');
  const[description,setDescription]=useState('');
  const [form,setForm]=useState('');


  const sendRequest1=async()=>{
    const res= await axios.get('http://localhost:5000/driveDetails').catch(err=>console.log(err));
    const data =await res.data;
    return data;
  };

  // const [drive, setDrives] = useState()
  const fetchDetails = async () => {
    try {
      console.log("id pass", id);
      const data = await axios.get(`http://localhost:5000/driveDetails/${id}`);
      console.log("dattatata" , data.data);
      console.log(data.data.drive['title']);
      setDrives(data);
          setTitle(data.data.drive['title']);
          setDescription(data.data.drive['description']);
          setForm(data.data.drive['form']);
      
      // const res = await axios.get("http://localhost:5000/driveDetails/663358827afb0be53eb1b266");
      // console.log(res);
     return data.data;
    } catch (err) {
      console.log(err);
      throw new Error('Failed to fetch drive details');
    }
  };
   

 

  const sendRequest= async () =>{
    try{
       const res = await axios.put(`http://localhost:5000/driveDetails/update/${id}`,{
        title:title,
        description:description,
        form:form
       });
       console.log(res);
       setDrives(sendRequest1());
       return res.data;
      }catch(err){
        console.log(err);
      throw new Error('fill the details carefurlly');
      }
  }

  console.log(id);
  
  useEffect(() => {
    fetchDetails();
      // .then(data => {
      //   if (data) {
      //     setDrives(data);
      //     setTitle(data.title);
      //     setDescription(data.description);
      //     setForm(data.form);
      //   } else {
      //     throw new Error('Drive details not found');
      //   }
      // })
      // .catch(error => console.error(error)); // Handle error gracefully
  }, [id]);
  





   const labelStyles={mb:1,mt:2,fontSize:'24px',fontWeight:'bold'};


   const handleTitle=(e)=>{
          setTitle(e.target.value);
   };

   const handleDescription=(e)=>{
    setDescription(e.target.value);
};
const handleForm=(e)=>{
  setForm(e.target.value);
};
 
    
 
   const handleSubmit=(e)=>{
            e.preventDefault();
         
            sendRequest().then(data => console.log(data)).then(()=>navigate('/myDrives')).catch((error) => alert(error.message));
   }
  return (
    <div>{<form onSubmit={handleSubmit}>
    <Box border={3} borderColor='linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(36,36,162,1) 40%, rgba(0,212,255,1) 100%)' borderRadius={10}boxShadow='10px 10px 20px #ccc' padding={3} margin={'auto'} marginTop={3} display='flex' flexDirection={'column'} width={'80%'}>
      <Typography fontWeight={'bold'} padding={3} color='grey' variant='h2' TextAlign={'center'}>
        Post Your Drive
        <InputLabel sx={labelStyles}>Title</InputLabel>
        <TextField name='title' onChange={handleTitle}
        value={title} margin='normal' variant='outlined'  />
        <InputLabel sx={labelStyles}>Description</InputLabel>
        <TextField name='description' onChange={handleDescription} value={description} margin='normal' variant='outlined'  />  
       
      
          <InputLabel sx={labelStyles}>form 
          Link</InputLabel>
        <TextField name='form' onChange={handleForm}  value={form} margin='normal' variant='outlined'  />

      </Typography>
      <Button sx={{mt:2 ,borderRadius:4}} variant='contained' color='warning' type='submit'>submit</Button>
    </Box>
    </form>}</div>
  )
}

export default DrivesDetails