import { Avatar, Box, Card,  CardContent, CardHeader, CardMedia,  Typography } from '@mui/material'
import React from 'react'


const Sdrive = ({title,description,imageURL,userName,form,isUser,id}) => {



  console.log(title,isUser);
  return (
    <div>  <Card sx={{bgcolor:'#ffebee', width: '40%',margin:'auto',mt:2,padding:2,boxShadow:'5px 5px 10px #ccc',":hover":{boxShadow:'10px 10px 20px #ccc'} }}>
      {isUser && (<Box display='flex'>
     
        
      </Box>)}
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
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
      alt=""
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

export default Sdrive