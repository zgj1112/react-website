import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "src/App";
import Home from "@pages/website/home/Home";
import Product from "@pages/website/product/index.tsx";
import Manager from "@pages/manager/Manager";
import WebsiteLayout from "@pages/website/Index.tsx";

// =======================================
// 路由跳转方式
// =======================================
// import { useNavigate } from "react-router-dom";
//  const navigate = useNavigate();
//     navigate("/website");
//   // 带参数跳转
// navigate('/target-path', {
//   state: { id: 123, name: 'example' }
// });

// // 替换当前路由而不是添加历史记录
// navigate('/target-path', { replace: true });

// // 前进/后退
// navigate(1);  // 前进
// navigate(-1); // 后退

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Navigate to="/website/home" replace />,
      },
      {
        path: "website",
        element: <WebsiteLayout />, // 类似 Vue 的 Index.vue
        children: [
          {
            index: true, // 默认路由 `/website`
            path: "home",
            element: <Home />,
          },
          {
            path: "product",
            element: <Product />,
          },
        ],
      },
      {
        path: "manager",
        element: <Manager />,
      },
      {
        path: "*",
        element: <Navigate to="/website/home" replace />,
      },
    ],
  },
]);
