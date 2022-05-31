import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  successMessage: "",
  errorMessage: "",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    resetSnackbar(state) {
      state.successMessage = "";
      state.errorMessage = "";
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    setSuccessMessage(state, action) {
      state.successMessage = action.payload;
    },
  },
});

export const { resetSnackbar, setErrorMessage, setSuccessMessage } = snackbarSlice.actions;

export default snackbarSlice.reducer;
