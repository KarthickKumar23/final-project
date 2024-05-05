import { Box, Button, Input, InputLabel, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCm-yBp_Oz-F4zhlUaeMKI6j-HlEwHI31g",
    authDomain: "courserecommendation-86c99.firebaseapp.com",
    projectId: "courserecommendation-86c99",
    storageBucket: "courserecommendation-86c99.appspot.com",
    messagingSenderId: "935737551110",
    appId: "1:935737551110:web:e9e3919a7dd4ac4f05d687"
  };
  
  const app = initializeApp(firebaseConfig);
  
  const storage = getStorage(app); 
const UpdateProfile = () => {
  const navigate = useNavigate();
//   const [inputs, setInputs] = useState({
//     name: "",
//     tenthMarkpercentage: "",
//     twelethMarkPercentage: "",
//     currentCGPA: "",
//     resume: null,
//     tenthmarkSheet: null,
//     twelethMarkSheet: null,
//     user: ""
//   });
  const[name,setName]=useState("");
  const[tenthMarkPercentage,setTenthMarkPercentage]=useState("");
  const[twelethMarkPercentage,setTwelthPercentage]=useState("");
  const[currentCGPA,setCurrentCGPA]=useState("");
  const[resume,setResume]=useState(null);
  const[tenthMarkSheet,setTenthMarkSheet]=useState(null);
  const[twelethMarkSheet,setTwelthMarkSheet]=useState(null);
  const handleName =async (e)=>{
  
    setName(  e.target.value);
  }
  const handleTenthMarkPercentage =async (e)=>{
  
    setTenthMarkPercentage(  e.target.value);
  }
  const handleTwelethMarkPercentage =async (e)=>{
  
    setTwelthPercentage(  e.target.value);
  }
  const handleCurrentCGPA =async (e)=>{
  
    setCurrentCGPA(  e.target.value);
  }

  const handleResumeChange =async (e)=>{
    const file= e.target.files[0];
    setResume(file);
  }
  const handleTenthChange =async (e)=>{
    const file= e.target.files[0];
    setTenthMarkSheet(file);
  }
  const handleTwelethChange =async (e)=>{
    const file= e.target.files[0];
    setTwelthMarkSheet(file);
  }

  const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' };

  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInputs(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };


  const sendRequest = async () => {
    const resumeImageRef = ref(storage, resume.name);
    await uploadBytes(resumeImageRef, resume);
    const resumeImageUrl = await getDownloadURL(resumeImageRef);

    const tenthImageRef = ref(storage, tenthMarkSheet.name);
    await uploadBytes(tenthImageRef, tenthMarkSheet);
    const tenthImageUrl = await getDownloadURL(tenthImageRef);

    const twelthImageRef = ref(storage, twelethMarkSheet.name);
    await uploadBytes(twelthImageRef, twelethMarkSheet);
    const twelthImageUrl = await getDownloadURL(twelthImageRef);

  

    const res = await axios.post('http://localhost:5000/student/updateProfile',  {
        name: name,
        tenthMarkPercentage:tenthMarkPercentage,
        twelthMarkPercentage:twelethMarkPercentage,
        currentCGPA:currentCGPA,
        resume:resumeImageUrl,
        tenthMarkSheet:tenthImageUrl,
        twelthMarkSheet:twelthImageUrl,
        user:localStorage.getItem('userId')


        
    }).catch(err => console.log(err));
    const data = res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    sendRequest().then(data => console.log(data)).then(() => navigate('/studentDrives'));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor='linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(36,36,162,1) 40%, rgba(0,212,255,1) 100%)' borderRadius={5} boxShadow='10px 10px 20px #ccc' padding={3} margin={'auto'} marginTop={3} display='flex' flexDirection={'column'} width={'40%'}>
          <Typography fontWeight={'bold'} padding={3} color='grey' variant='h2' TextAlign={'center'}>
            Student profile
            <InputLabel sx={labelStyles}>Name</InputLabel>
            <input type="text" name="name" onChange={handleName} value={name} margin='normal' variant='outlined' />

            <InputLabel sx={labelStyles}>Tenth Mark Percentage</InputLabel>
            <input type="text" name="tenthMarkpercentage" onChange={handleTenthMarkPercentage} value={tenthMarkPercentage} margin='normal' variant='outlined' />
            <InputLabel sx={labelStyles}>Twelfth Mark Percentage</InputLabel>
            <input type="text" name="twelethMarkPercentage" onChange={handleTwelethMarkPercentage} value={twelethMarkPercentage} margin='normal' variant='outlined' />
            <InputLabel sx={labelStyles}>Current CGPA</InputLabel>
            <input type="text" name="currentCGPA" onChange={handleCurrentCGPA} value={currentCGPA} margin='normal' variant='outlined' />
            <InputLabel sx={labelStyles}>Resume</InputLabel>
            <Input type="file" name="resume" onChange={handleResumeChange} />
            <InputLabel sx={labelStyles}>Tenth Mark Sheet</InputLabel>
            <Input type="file" name="tenthmarkSheet" onChange={handleTenthChange} />
            <InputLabel sx={labelStyles}>Twelfth Mark Sheet</InputLabel>
            <Input type="file" name="twelethMarkSheet" onChange={handleTwelethChange} />
          </Typography>
          <Button sx={{ mt: 2, borderRadius: 4 }} variant='contained' color='warning' type='submit'>Submit</Button>
        </Box>
      </form>
    </div>
  );
};

export default UpdateProfile;
