// src/pages/website/Index.tsx
import Top from "./compotent/Top.tsx";
import Bottom from "./compotent/Bottom.tsx";
import { Outlet } from "react-router-dom";

const WebsiteLayout = () => {
  return (
    <div className="IndexBox">
      <Top />
      <Outlet /> {/* 渲染 /website 子页面，如 Home */}
      <Bottom />
    </div>
  );
};

export default WebsiteLayout;
