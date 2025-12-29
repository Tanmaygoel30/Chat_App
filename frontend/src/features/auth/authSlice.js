import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoggingIn: false,
  isSigningUp: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuth: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginStart: (state) => {
      state.isLoggingIn = true;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoggingIn = false;
    },
    signUpStart: (state) => {
      state.isSigningUp = true;
    },
    signup: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isSigningUp = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { checkAuth, loginStart, login, signUpStart, signup, logout } =
  authSlice.actions;

export default authSlice.reducer;
