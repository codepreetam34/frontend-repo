import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { axiosMiddleware } from "../../axiosSettings";

// Reducers from slices
import menuListSlice from "../Slices/HeaderMenuList/HeaderMenuListSlice";
import authReducer from "../Slices/Login/auth.slice";
import resetPasswordSlice from "../Slices/Login/resetPasswordLink";

const rootReducer = combineReducers({
  menuList: menuListSlice,
  auth: authReducer,
  resetPassword: resetPasswordSlice,
});

const initializeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        axiosMiddleware
      ),
    devTools: true,
  });

export default initializeStore;
