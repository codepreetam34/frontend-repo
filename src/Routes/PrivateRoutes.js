// import Login from "container/Signin/Login";
// import React from "react";
// import { Navigate, Outlet } from "react-router";
// import { getItem } from "services/commonService";

// import { LOGIN } from "./Routes";

// function PrivateRoutes() {
//   const isLoggedIn = getItem("AUTH_ACCESS_TOKEN");
//   if (!isLoggedIn) return <Login />;
//   else return <Outlet />;
// }

// export default PrivateRoutes;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LANDING_PAGE } from "./Routes";

const PrivateRoutes = (props) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("AUTH_ACCESS_TOKEN");
    if (!login) {
      navigate("/");
    }
  });

  return (
    <div>
      <Component />
    </div>
  );
};

export default PrivateRoutes;
