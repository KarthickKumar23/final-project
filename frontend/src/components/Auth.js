import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { authActions } from '../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
      const dispath=useDispatch();
      const navigate=useNavigate();

  const [inputs, setInputs] = useState({
    name:"",email:"",password:""
  });

  const [isSignUp, setIsSignUp] = useState(false);


  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }));

  };
  
  const sendRequest =async (type ='login') =>{
  
  const res = await axios.post(`http://localhost:5000/api/user/${type}`,
   {
     name :inputs.name,
      email:inputs.email,
      password:inputs.password
    })
  .catch((err)=>console.log(err))
  const data=await res.data;
  console.log(data);
  return data;
    

  }
  

  const handleSubmit =(e)=>{
      e.preventDefault();
      console.log(inputs);
     if(isSignUp){
      sendRequest('signup').then((data)=>localStorage.setItem('userId',data.user._id)).then(()=>dispath(authActions.login())).then((()=>navigate("/drives"))).then((data)=>console.log(data))

     }else{
      sendRequest().then((data)=>localStorage.setItem('userId',data.user._id)).then(()=>dispath(authActions.login())).then((()=>navigate("/drives"))).then((data)=>console.log(data))
     }
  }
  return (
     <form onSubmit={handleSubmit}>
         <Box maxWidth={400} display='flex' flexDirection={'column'} alignItems='center' justifyContent={'center'} boxShadow='10px 10px 20px #ccc' padding={3} margin='auto' marginTop={5} borderRadius={5}>

            <Typography variant='h2' padding={3} textAlign='center'>{isSignUp ? "SignUP":" Admin Login" }</Typography>

           {isSignUp && <TextField name="name" onChange={handleChange} value={inputs.name} placeholder='Name' margin='normal'/>}

            <TextField name='email' onChange={handleChange} value={inputs.email} placeholder='Email' type={'email'}margin='normal'/>

            <TextField name='password' onChange={handleChange} value={inputs.password} placeholder='password' type={'password'}margin='normal'/>
           
      <Button type='submit' variant='contained' sx={{borderRadius:3,marginTop:3}} color='warning'>Submit</Button>
      {/* <Button onClick={() => {setIsSignUp(!isSignUp)}} sx= {{borderRadius:3,marginTop:3}}>Go to {isSignUp ? "Login":"SignUP"}</Button> */}

   

         </Box>
     </form>
  )
}

export default Auth