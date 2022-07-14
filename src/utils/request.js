import axios from "axios";
import store from "@/store";
import JASONBig from "json-bigint";
const request = axios.create({
  baseURL: "http://42.192.129.12:8000/",
  transformResponse: [
    function (data) {
      try {
        return JASONBig.parse(data);
      } catch (e) {
        return data;
      }
    },
  ],
});

export default request;

// 设置请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = store.state?.user?.token;
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
