import { createSlice } from "@reduxjs/toolkit";

const initialState = { loggedUser: {} };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    tokenExpired: (state) => {
      state.loggedUser = null;
    },
  },
  extraReducers: {},
});

export const { tokenExpired } = authSlice.actions;

export default authSlice.reducer;
