import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Drive = ({title,description,imageURL,userName,form,isUser,id}) => {
  const navigate=useNavigate();
  const handleEdit= (e)=>{
    navigate(`/drives/${id}`)
  }
  const deleteRequest =async () =>{
     const res =await axios.delete(`http://localhost:5000/driveDetails/${id}`).catch((err) => console.log(err));
     const data =await res.data;
     return data;

  }
  const handleDelete=(e)=>{
    e.preventDefault();
    deleteRequest().then(()=>navigate('/')).then(()=>navigate('/drives'));
  }
  console.log(title,isUser);
  return (
    <div>  <Card sx={{bgcolor:'#ffebee', width: '40%',margin:'auto',mt:2,padding:2,boxShadow:'5px 5px 10px #ccc',":hover":{boxShadow:'10px 10px 20px #ccc'} }}>
      {isUser && (<Box display='flex'>
        <IconButton onClick={handleEdit} sx ={{marginLeft:'auto'}}>
          <EditIcon color='warning'/>
          </IconButton>
        <IconButton onClick={handleDelete} ><DeleteIcon color='error'/></IconButton>
        
      </Box>)}
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'red' }} aria-label="">
          {userName}
        </Avatar>
      }
    
      title={title}
      subheader="September 14, 2016"
    />
    <CardMedia
      component=""
      height="194"
      image={imageURL}
      alt="image need to be added"
    />
    <hr />
    <br />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
   <b>{userName} {':'}{  description}</b>
      </Typography>
    </CardContent>
  
    
      <CardContent>
     
        <Typography paragraph>
    {form}
        </Typography>
      
      </CardContent>
   
  </Card></div>
  )
}

export default Drive