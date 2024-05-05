import React, { useState } from 'react'
import {AppBar, Box, Button, Tabs, Toolbar, Typography,Tab} from "@mui/material"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';



const Header = () => {
  const dispath=useDispatch();
 
    const isLoggedIn=useSelector(state=>state.isLoggedIn);

    const isStudentLogin=useSelector(state =>state.isStudent);

    const [value,setValue]=useState();


  return (
   <AppBar position='sticky' sx={{background:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(36,36,162,1) 40%, rgba(0,212,255,1) 100%)"}}>
    <Toolbar>
        <Typography variant='h4'>KIT Drives</Typography>
      { isLoggedIn && !isStudentLogin && <Box display='flex' marginLeft={'auto'} marginRight={'auto'}>
            <Tabs textColor='inherit' value={value} onChange={(e,value)=>setValue(value)}>
                <Tab LinkComponent={Link} to="/drives" label ='All Drives' />
                <Tab  LinkComponent={Link} to="/myDrives"  label ='My Drives' />
                <Tab  LinkComponent={Link} to="/drives/add"  label ='Add Drives' />

            </Tabs>

        </Box> }
     
        <Box display="flex" marginLeft="auto">
        {!isLoggedIn && !isStudentLogin &&<> 
          <Button  LinkComponent={Link} to="/auth"  variant='contained' sx={{margin:1,borderRadius:10}} color='warning'> Admin Login</Button>
          {/* <Button  LinkComponent={Link} to="/auth"  variant='contained' sx={{margin:1,borderRadius:10}} color='warning'>SignUp</Button>  */}
          <Button  LinkComponent={Link} to="/studentAuth"  variant='contained' sx={{margin:1,borderRadius:10}} color='warning'>Student Login</Button>
          </>}

          {(isLoggedIn || isStudentLogin) && <Button onClick={()=>dispath(authActions.logout() )} LinkComponent={Link} to="/auth"  variant='contained' sx={{margin:1,borderRadius:10}} color='warning'>LogOUt</Button> }


        </Box>
    </Toolbar>
   </AppBar>
  )
}

export default Header;