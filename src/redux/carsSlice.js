import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createCar, getCars } from "../api/services/carService";

const initialState = {
  cars: null,
  error: {
    isError: false,
    message: "",
  },
  isLoading: false,
};

export const createNewCar = createAsyncThunk(
  "cars/createCar",
  async (car, { rejectWithValue }) => {
    try {
      const response = await createCar(car);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const getAllCars = createAsyncThunk(
  "cars/getCars",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await getCars();

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
  },
  extraReducers: {
    // [createNewCar.fulfilled]: (state, action) => {
    //   state.car = {action.payload};
    //   state.error.isError = false;
    //   state.isLoading = false;
    // },
    // [createNewCar.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [createNewCar.rejected]: (state, action) => {
    //   state.error.message = action.payload;
    //   state.error.isError = true;
    //   state.isLoading = false;
    // },
    [getAllCars.fulfilled]: (state, action) => {
      state.cars = action.payload;
      state.error.isError = false;
      state.isLoading = false;
    },
    [createNewCar.pending]: (state) => {
      state.isLoading = true;
    },
    [createNewCar.rejected]: (state, action) => {
      state.error.message = action.payload;
      state.error.isError = true;
      state.isLoading = false;
    },
  },
});

export const { setCars } = carsSlice.actions;

export default carsSlice.reducer;
