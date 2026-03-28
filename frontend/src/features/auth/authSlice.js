import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoggingIn: false,
  isSigningUp: false,
  socket: null,
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
    connectSocket: (state) => {
      if (!state.user || state.socket) return;

      const socket = io("http://localhost:5001", {
        query: {
          userId: state.user._id,
        },
      });
      socket.connect();
      state.socket = socket;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  checkAuth,
  loginStart,
  login,
  signUpStart,
  signup,
  logout,
  connectSocket,
} = authSlice.actions;

export default authSlice.reducer;
