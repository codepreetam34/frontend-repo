import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { axiosMiddleware } from "../../axiosSettings";

// Reducers from slices
import menuListSlice from "../Slices/HeaderMenuList/HeaderMenuListSlice";
import authReducer from "../Slices/Login/auth.slice";
import resetPasswordSlice from "../Slices/Login/resetPasswordLink";
import passwordSetup from "../Slices/Login/setupPassword";
import getProductsListData from "../Slices/ProductPage/ProductsPageSlice";
import ProductDetailPageSlice from "Redux/Slices/ProductDetailPage/ProductDetailPageSlice";
import addToCartProductsSlice from "Redux/Slices/AddToCart/AddToCartSlice";
import addToCartAddressSlice from "Redux/Slices/AddToCart/AddAddress";
import addToCartAddAddressSlice from "Redux/Slices/AddToCart/AddToCartAddAddressSlice";
import getCarouselSlice from "Redux/Slices/LandingPageSlice/LandingPageSlice";

const rootReducer = combineReducers({
  menuList: menuListSlice,
  auth: authReducer,
  resetPassword: resetPasswordSlice,
  passwordSetup: passwordSetup,
  getProductsList: getProductsListData,
  getProductsDetail: ProductDetailPageSlice,
  addToCartProducts: addToCartProductsSlice,
  addToCartAddress: addToCartAddressSlice,
  addToCartAddAddress: addToCartAddAddressSlice,
  getCarousel: getCarouselSlice,
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
