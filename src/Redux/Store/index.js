import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { axiosMiddleware } from "../../axiosSettings";

// Reducers from slices
import menuListSlice from "../Slices/HeaderMenuList/HeaderMenuListSlice";
import authReducer from "../Slices/Login/auth.slice";
import resetPasswordSlice from "../Slices/Login/resetPasswordLink";
import passwordSetup from "../Slices/Login/setupPassword";
import getProductsListData from "../Slices/ProductPage/ProductsPageSlice";
import ProductDetailPageSlice from "../Slices/ProductDetailPage/ProductDetailPageSlice";
import addToCartProductsSlice from "../Slices/AddToCart/AddToCartSlice";
import addToCartAddressSlice from "../Slices/AddToCart/AddAddress";
import addToCartAddAddressSlice from "../Slices/AddToCart/AddToCartAddAddressSlice";
import getCarouselSlice from "../Slices/LandingPageSlice/LandingPageSlice";
import addReviewsSlice from "../Slices/AddReviewSlice/AddReviewSlice";
import myProfileSlice from "../Slices/MyProfileSlice/MyProfile";
import deleteAddressSlice from "../Slices/AddToCart/DeleteAddress";
import TwoAdsBannerSlice from "../Slices/TwoAdsBanner/TwoAdsBannerSlice";
import ShopByOccasionSlice from "../Slices/ShopByOccasion/ShopByOccasionSlice";
import PamperZoneSlice from "../Slices/PamperZone/PamperZoneSlice";
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
  addReviews: addReviewsSlice,
  myProfile: myProfileSlice,
  deleteAddress: deleteAddressSlice,
  twoAdsBanner: TwoAdsBannerSlice,
  shopByOccasion: ShopByOccasionSlice,
  pamperZone: PamperZoneSlice,
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
