import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createCar, getCars, updateCar } from "../api/services/carService";

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

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAllCars = createAsyncThunk(
  "cars/getCars",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await getCars();

      return response?.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const updateExistingCar = createAsyncThunk("cars/updateExistingCar", async (car, { rejectWithValue }) => {
  try {
    const response = await updateCar(car);

    return response?.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    addCar: (state, action) => {
      state.cars.push(action.payload);
    },
  },
  extraReducers: {
    [getAllCars.fulfilled]: (state, action) => {
      state.cars = action.payload;
      state.error.isError = false;
      state.isLoading = false;
    },
    [createNewCar.fulfilled]: (state, action) => {
      state.cars.push(action.payload);
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
    [updateExistingCar.fulfilled]: (state, action) => {
      const car = action.payload;
      const carToEditIndex = state.cars?.findIndex(({ id }) => id === car?.id);
      state.cars[carToEditIndex] = car;
    },
  },
});

export const { addCar } = carsSlice.actions;

export default carsSlice.reducer;
