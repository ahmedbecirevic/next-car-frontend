import { createSlice } from "@reduxjs/toolkit";

const initialState = { loggedUser: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.loggedUser = action.payload;
    },
    tokenExpired: (state) => {
      state.loggedUser = null;
    },
    logoutUser: (state) => {
      state.loggedUser = null;
    },
  },
  extraReducers: {},
});

export const { tokenExpired, userLoggedIn, logoutUser } = authSlice.actions;

export default authSlice.reducer;
