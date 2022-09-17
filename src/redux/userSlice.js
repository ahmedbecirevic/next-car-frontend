import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { requestWithAuthHeader } from "../api/helpers";
import { setErrorMessage } from "./snackbarSlice";

export const fetchUserData = createAsyncThunk("fetchUserData", async (data, { dispatch, rejectWithValue }) => {
  try {
    const res = await requestWithAuthHeader("GET", "/users");

    return res.data;
  } catch (error) {
    dispatch(setErrorMessage({ text: "Failed to fetch" }));

    return rejectWithValue(error);
  }
});

const initialState = {
  email: "",
  image: null,
  id: null,
  displayName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload?.email;
      state.image = action.payload?.profilePictureUrl;
      state.id = action.payload?.id;
    },
  },
  extraReducers: {
    [fetchUserData.fulfilled]: (state, action) => {
      state.email = action.payload?.email;
      state.image = action.payload?.profilePictureUrl;
      state.id = action.payload?.id;
      state.displayName = action.payload?.displayName;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
