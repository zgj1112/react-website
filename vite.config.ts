import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "",
  server: {
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://139.159.152.231:40002", // 目标 API 地址
        changeOrigin: true, // 允许跨域请求
        rewrite: (path) => path.replace(/^\/api/, ""), // 重写路径，将 /api 替换为空
      },
    },
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@api": path.resolve(__dirname, "src/api"),
      "@components": path.resolve(__dirname, "src/components")
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  plugins: [react()],
});
