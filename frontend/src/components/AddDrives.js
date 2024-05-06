import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddDrives = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
    form: ""
  });
  const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const sendRequest = async () => {
    try{const res = await axios.post('http://localhost:5000/driveDetails/add', {
      title: inputs.title,
      description: inputs.description,
      image: inputs.imageURL,
      user: localStorage.getItem('userId'),
      form: inputs.form
    }); return res.data}
    catch(err){
    throw new Error('Give proper details');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    sendRequest().then(data => console.log(data)).then(() => navigate('/drives')).catch(err => alert(err.message));
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor='linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(36,36,162,1) 40%, rgba(0,212,255,1) 100%)' borderRadius={10} boxShadow='10px 10px 20px #ccc' padding={3} margin={'auto'} marginTop={3} display='flex' flexDirection={'column'} width={'80%'} length={'50%'}>
          <Typography fontWeight={'bold'} padding={3} color='grey' variant='h2' TextAlign={'center'}>
            Post Your Drive
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField name='title' onChange={handleChange} value={inputs.title} margin='normal' variant='outlined'  />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField name='description' onChange={handleChange} value={inputs.description} margin='normal' variant='outlined'  />  
            {/* <InputLabel sx={labelStyles}>ImageURL</InputLabel>
            <TextField name='imageURL' onChange={handleChange} value={inputs.imageURL} margin='normal' variant='outlined' /> */}
            <InputLabel sx={labelStyles}>Form Link</InputLabel>
            <TextField name='form' onChange={handleChange} value={inputs.form} margin='normal' variant='outlined'  />
          </Typography>
          <Button sx={{ mt: 2 , borderRadius: 4}} variant='contained' color='warning' type='submit'>Submit</Button>
        </Box>
      </form>
    </div>
  );
}

export default AddDrives;
