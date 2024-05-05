import Header from "./components/Header";
import React, { useEffect } from "react";
import { Routes ,Route} from "react-router-dom";
import Auth from "./components/Auth";
import Drives from "./components/Drives";
import UserDrives from "./components/UserDrives";
import AddDrives from "./components/AddDrives";
import { useDispatch, useSelector } from "react-redux";
import DrivesDetails from "./components/DrivesDetails";
import { authActions } from "./store";
import StudentAuth from "./components/StudentAuth";
import StudentDrives from "./components/StudentDrives";
import UpdateProfile from './components/UpdateProfile.js'
import '../src/App.css'

function App() {
      const isLoggedIn=useSelector(state=>state.isLoggedIn);
      const isStudent=useSelector(state=>state.isStudent);
      console.log(isLoggedIn);
      const dispath =useDispatch();
      useEffect(()=>{
        if(localStorage.getItem('userId')){
          dispath(authActions.login());
        }
      },[])
  return (
    <React.Fragment>
    <header>
      <Header />
    </header>
    <main>
      <Routes>
        {!isLoggedIn && !isStudent ? (
          <React.Fragment>
            <Route path='/studentAuth' element={<StudentAuth />} />
            <Route path='/auth' element={<Auth />} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Route path='/drives' element={<Drives />} />
            <Route path='/myDrives' element={<UserDrives />} />
            <Route path='/drives/add' element={<AddDrives />} />
            <Route path='/drives/:id' element={<DrivesDetails />} />
            <Route path='/studentDrives' element={<StudentDrives />} />
            <Route path='/updateProfile' element={<UpdateProfile />} />
          </React.Fragment>
        )}
      </Routes>
    </main>
  </React.Fragment>
  );
}

export default App;
