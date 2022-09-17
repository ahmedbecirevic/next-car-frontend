import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { requestWithAuthHeader } from "../api/helpers";

const initialState = { purchases: [] };

export const getAllPurchases = createAsyncThunk(
  "purchases/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await requestWithAuthHeader("GET", "/purchase-history");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAllPurchasesForUser = createAsyncThunk(
  "purchases/getAllByUSer",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await requestWithAuthHeader("GET", `/purchase-history/user/${userId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createNewPurchase = createAsyncThunk(
  "purchases/create",
  async (purchase, { rejectWithValue }) => {
    try {
      const response = await requestWithAuthHeader("POST", "/purchase-history", purchase);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const purchaseSlice = createSlice({
  name: "purchases",
  initialState,
  reducers: {
    addPurchase: (state, action) => {
      state.purchases.push(action.payload);
    },
  },
  extraReducers: {
    [getAllPurchasesForUser.fulfilled]: (state, action) => {
      state.purchases = action.payload;
    },
    [createNewPurchase.fulfilled]: (state, action) => {
      state.purchases.push(action.payload);
    },
  },
});

export const { addPurchase } = purchaseSlice.actions;

export default purchaseSlice.reducer;
