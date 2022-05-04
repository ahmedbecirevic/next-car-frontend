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
      document.cookie = "x-auth-cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      state.loggedUser = null;
    },
  },
  extraReducers: {},
});

export const { tokenExpired, userLoggedIn, logoutUser } = authSlice.actions;

export default authSlice.reducer;
