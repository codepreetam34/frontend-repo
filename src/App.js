import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import LandingPage from "container/LandingPage";
import { ThemeProvider } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter } from "react-router-dom";
import theme from "./theme";
import { FORGOTPASSWORD, LOGIN } from "Routes/Routes";
import Login from "container/Signin/Login";
import ForgotPassword from "container/Signin/ForgotPassword";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path={LOGIN} element={<Login />} />
            <Route path={FORGOTPASSWORD} element={<ForgotPassword />} />
            {/* <Route element={<PrivateRoutes/>}>
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="analytics" element={<Analytics />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} /> */}
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
