// src/pages/website/Top.tsx
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Top.module.scss";

const Top = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "首页",
      key: "/website/home",
    },
    {
      label: "产品页",
      key: "/website/product",
    },
    {
      label: "管理后台",
      key: "/manager",
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: "0 16px",
        boxShadow: "0 2px 8px #f0f1f2",
      }}
    >
      <Menu
        className={styles.menuContainer}
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </div>
  );
};

export default Top;
