// src/utils/request.ts
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
// import { useRouter, Router } from "vue-router";
// import { AxiosError } from 'axios';
import { router } from "src/router/index";

import { useNavigate } from "react-router-dom";
import { message } from "antd";
import storage from "store";

// import { managerApi } from "@api/manager";
// import { loginApi } from "@api/login";
// import { useStore } from "src/store/index";
// import { refreshToken, getApi } from "@api/login";

export interface responseType<T> {
  code: number | string;
  msg: string;
  data: T;
}

let ACCESS_TOKEN: string = "token";
// let REFRESH_TOKEN = "refresh_token";
// const router: Router = useRouter();
const instance: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000, // 请求超时设置
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token: string = storage.get("access_token");
    // let whiteList = [
    //   managerApi.getmodule,
    //   managerApi.getContent,
    //   loginApi.Login,
    // ];
    if (token) {
      // 有 token 且不是白名单接口才加 token
      if (!config.headers[ACCESS_TOKEN]) {
        config.headers[ACCESS_TOKEN] = token;
      }
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
let firstLogoutTime: number; //记录重复响应时间
let isRefreshing = false; // 是否正在请求刷新token接口的标记
let requestarr: any[] = []; // 请求队列

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const data = response.data; // T
    if (data.code == 200) {
      //  message.error("请求超时，请稍后重试");
      return response;
    } else {
      message.error(data.msg || "请求错误");
      return Promise.reject(data);
    }
  },
  (error: AxiosError) => {
    // const [messageApi, contextHolder] = message.useMessage();
    // if (error.code == "ECONNABORTED") {
    //   message.error("请求超时，请稍后重试");
    // }
    // messageApi.info("服务器错误，请稍后重试");
    // if (error.code != "SUCCESS") {
    //   message.error("服务器错误，请稍后重试");
    // }

    // 统一处理请求错误
    if (error.status == 401 || error.code == "ERR_NETWORK") {
      let time: number = new Date().getTime();
      // 3s内不重复提示
      if (firstLogoutTime && time - firstLogoutTime < 3000) {
        console.log("请求重复");
      } else {
        firstLogoutTime = time;
        message.error("登录失效");
      }
      const token: string = storage.get("access_token");
      if (token) {
        storage.remove("access_token");
      }
      // router.push({ name: "Login" });

      const navigate = useNavigate();
      navigate("/website");
    }
    message.error(error.message || "请求错误");
    return Promise.reject(error);
  }
);

// function timemsgFun(msg: string) {
//   let time = new Date().getTime();
//   // 3s内不重复提示
//   if (firstLogoutTime && time - firstLogoutTime < 1000) {
//   } else {
//     firstLogoutTime = time;
//     // message.error(msg);
//   }
// }

export default instance;
