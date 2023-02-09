import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { axiosMiddleware } from "../../axiosSettings";

// Reducers from slices
import menuListSlice from "../Slices/HeaderMenuList/HeaderMenuListSlice";
import authReducer from "../Slices/Login/auth.slice";
import resetPasswordSlice from "../Slices/Login/resetPasswordLink";
import passwordSetup from "../Slices/Login/setupPassword";

const rootReducer = combineReducers({
  menuList: menuListSlice,
  auth: authReducer,
  resetPassword: resetPasswordSlice,
  passwordSetup: passwordSetup,
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
