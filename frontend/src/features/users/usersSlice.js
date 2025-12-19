import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: null,
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedUser } = usersSlice.actions;

export default usersSlice.reducer;
