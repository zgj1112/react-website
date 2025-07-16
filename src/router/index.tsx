import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "@pages/Home";
import Manager from "@pages/Manager";

export const router = createBrowserRouter([
  {
    path: "*", // 捕捉所有未匹配的路径
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/", //默认跳转home
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/manager",
    element: <Manager />,
  },
]);
