import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./authSlice";
import carsReducer from "./carsSlice";
import snackbarReducer from "./snackbarSlice";
import userReducer from "./userSlice";
import purchaseReducer from "./purchaseSlice";

const reducer = {
  auth: authReducer,
  carsData: carsReducer,
  snackbar: snackbarReducer,
  userData: userReducer,
  purchaseData: purchaseReducer,
};

const combinedReducer = combineReducers(reducer);

const rootReducer = (state, action) => {
  // clear state on logout
  if (action.type === "auth/logoutUser/fulfilled" || action.type === "auth/tokenExpired" || action.type === "auth/logoutUser") {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return combinedReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "carsData",
    "snackbar",
    "purchaseData",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export const persistor = persistStore(store);
