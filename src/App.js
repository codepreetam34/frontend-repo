import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "container/LandingPage";
import { ThemeProvider } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './LandingPage.css';
import theme from "./theme";
import {
  EMAIL_VERIFY,
  EMAIL_VERIFY_OTP,
  FORGOTPASSWORD,
  LANDING_PAGE,
  LOGIN,
  PRODUCT_PAGE,
  SETUP_NEW_PASSWORD,
  SIGNUP,
} from "Routes/Routes";
import Login from "container/Signin/Login";
import SignUp from "container/SignUp/SignUp";
import ForgotPassword from "container/Signin/ForgotPassword";
import SetupNewPassword from "container/Signin/SetupNewPassword";
import EmailVerify from "container/SignUp/EmailVerify";
import EmailVerifyOtp from "container/SignUp/emailOtpVerification";
import ProductPage from "container/ProductPage/ProductPage";

import PrivateRoutes from "Routes/PrivateRoutes";

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

            {/* private routes below */}

            <Route
              path={PRODUCT_PAGE}
              element={<PrivateRoutes Component={ProductPage} />}
            />

            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

// new code above

// import "./App.css";

// import { ThemeProvider } from "@mui/material/styles";

// import { BrowserRouter } from "react-router-dom";
// import theme from "./theme";
// import LandingPage from "container/LandingPage";

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <BrowserRouter>
//         <LandingPage />
//       </BrowserRouter>
//     </ThemeProvider>
//   );
// }

export default App;
