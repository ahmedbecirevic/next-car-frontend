import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  image: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload?.email;
      state.image = action.payload?.profilePictureUrl;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
