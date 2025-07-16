import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
// import App from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "src/router/index.tsx"; // 引入上一步的路由配置

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
