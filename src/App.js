import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./container/LandingPage";
import {
  ADD_REVIEW,
  ADD_TO_CART,
  BLOGS,
  BLOGS_DETAIL,
  CATEGORY_PAGE,
  EMAIL_VERIFY,
  EMAIL_VERIFY_OTP,
  FAQ,
  FORGOTPASSWORD,
  // LANDING_PAGE,
  LOGIN,
  MY_PROFILE,
  ORDER_PAGE,
  PRIVACY_POLICY,
  PRODUCT_DETAIL,
  PRODUCT_PAGE,
  SETUP_NEW_PASSWORD,
  SIGNUP,
} from "./Routes/Routes";
import Login from "./container/Signin/Login";
import SignUp from "./container/SignUp/SignUp";
import ForgotPassword from "./container/Signin/ForgotPassword";
import SetupNewPassword from "./container/Signin/SetupNewPassword";
import EmailVerify from "./container/SignUp/EmailVerify";
import EmailVerifyOtp from "./container/SignUp/emailOtpVerification";
import ProductPage from "./container/ProductPage";
import ProductDetail from "./container/ProductDetail/ProductDetail";
import PrivateRoutes from "./Routes/PrivateRoutes";
import HorizontalLinearStepper from "./container/CartPaymentFlow/CartPaymentStepper/CartPaymentStepper";
import PrivacyPolicy from "./container/PrivacyPolicy/PrivacyPolicy";
import Faq from "./container/FAQ/Faq";
import Blogs from "./container/Blogs/Blogs";
import BlogDetailedPage from "./container/Blogs/BlogDetailedPage/BlogDetailedPage";
import AddReview from "./container/AddReview/AddReview";
import Profile from "./container/ProfileSection/AllViewsFile/AllViewsFile";
import PageNotFound from "./container/PageNotFound/PageNotFound";
import CategoryPage from "./container/CategoryPage";
import OrderPage from "container/OrderPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LandingPage.css";

import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path={LOGIN} element={<Login />} />
            <Route path={SIGNUP} element={<SignUp />} />
            <Route path={FORGOTPASSWORD} element={<ForgotPassword />} />
            <Route path={SETUP_NEW_PASSWORD} element={<SetupNewPassword />} />
            <Route path={EMAIL_VERIFY} element={<EmailVerify />} />
            <Route path={EMAIL_VERIFY_OTP} element={<EmailVerifyOtp />} />
            <Route path={PRIVACY_POLICY} element={<PrivacyPolicy />} />
            <Route path={FAQ} element={<Faq />} />
            <Route path={BLOGS} element={<Blogs />} />
            <Route path={BLOGS_DETAIL} element={<BlogDetailedPage />} />
            {/* private routes below */}
            <Route path={CATEGORY_PAGE} element={<CategoryPage />} />
            <Route path={ORDER_PAGE} element={<OrderPage />} />
            <Route
              path={PRODUCT_PAGE}
              element={<ProductPage />}
            />
            <Route
              path={PRODUCT_DETAIL}
              element={<ProductDetail />}
            />
            <Route
              path={ADD_TO_CART}
              element={<HorizontalLinearStepper />}
            />
            <Route
              path={ADD_REVIEW}
              element={<AddReview />}
            />
            <Route
              path={MY_PROFILE}
              element={<PrivateRoutes Component={Profile} />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
