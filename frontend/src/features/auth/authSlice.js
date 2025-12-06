import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuth: (state,action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    login: (state,action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signup: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { checkAuth, login, signup } = authSlice.actions;

export default authSlice.reducer;