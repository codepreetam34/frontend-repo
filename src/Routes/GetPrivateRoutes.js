import { lazy } from "react";
import { lazyRetry } from "Services/utils";
import { TEST } from "./Routes";

const TESTView = lazy(() =>
  lazyRetry(() => import("../Container/Signin/Test"))
);

export const privateRoutes = [
  {
    path: TEST,
    component: TESTView,
  },
];
