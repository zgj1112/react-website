import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/global.scss";
// import "antd/dist/reset.css"; // antd v5+
// import App from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "src/router/index.tsx"; // 路由配置
import zhCN from "antd/es/locale/zh_CN"; // 引入中文语言包（可选）
import { ConfigProvider } from "antd";
import "@ant-design/v5-patch-for-react-19";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>

  //   <ConfigProvider locale={zhCN}>
  //     <RouterProvider router={router} />
  //   </ConfigProvider>
  // </StrictMode>
  <RouterProvider router={router} />
);
