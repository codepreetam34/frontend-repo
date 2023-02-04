import React, { lazy } from "react";
import { LOGIN } from "./Routes";

const Login = lazy(() => import("../Container/Signin/Login"));

export const publicRoute = [
  {
    path: LOGIN,
    component: <Login />,
  },
];
