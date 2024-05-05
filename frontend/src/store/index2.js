import { configureStore, createSlice}from  '@reduxjs/toolkit';

const authStudentSlice=createSlice({
    name :'auth',
    initialState:{isLoggedIn:false},
    reducers :{
        login(state){
            state.isLoggedIn=true;
        },
        logout(state){
            localStorage.removeItem('userId');
            state.isLoggedIn=false
        }
    },
});

export const authStudentActions=authStudentSlice.actions;
export const store =configureStore({
    reducer:authStudentSlice.reducer
})