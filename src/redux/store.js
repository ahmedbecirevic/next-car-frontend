import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import carsReducer from "./carsSlice";
import snackbarReducer from "./snackbarSlice";
import userReducer from "./userSlice";

const reducer = {
  auth: authReducer,
  carsData: carsReducer,
  snackbar: snackbarReducer,
  userData: userReducer,
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

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});
