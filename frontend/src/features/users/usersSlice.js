import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: null,
  chats: [],
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    getChats: (state, action) => {
      state.chats = action.payload;
    },
    addMessage: (state, action) => {
      state.chats.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedUser, getChats, addMessage } = usersSlice.actions;

export default usersSlice.reducer;
