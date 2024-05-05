import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isStudent: false // Add isStudent property to track student login separately
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      state.isStudent= false;
    },
    logout(state) {
      localStorage.removeItem('userId');
      state.isLoggedIn = false;
      state.isStudent =false;
    },
    studentLogin(state) {
      state.isLoggedIn = false;
      state.isStudent = true; // Set isStudent to true when student logs in
    }
  },
});

export const authActions = authSlice.actions;
export const store = configureStore({
  reducer: authSlice.reducer
});