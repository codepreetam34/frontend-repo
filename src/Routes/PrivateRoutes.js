import Login from "Container/Signin/Login";
import React from "react";
import { Navigate, Outlet } from "react-router";
import { getItem } from "Services/commonService";
import { LOGIN } from "./Routes";

function PrivateRoutes() {
  const isLoggedIn = getItem("AUTH_ACCESS_TOKEN");
  if (!isLoggedIn) return <Login />;
  else return <Outlet />;
}

export default PrivateRoutes;
