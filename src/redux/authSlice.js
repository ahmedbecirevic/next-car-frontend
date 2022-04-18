import { createSlice } from "@reduxjs/toolkit";

const initialState = { loggedUser: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionExpired: (state) => {
      state.loggedUser = null;
    },
  },
  extraReducers: {},
});

export const { sessionExpired } = authSlice.actions;

export default authSlice.reducer;
