import request from "@/utils/request";
// import store from "@/store";
// 获取登录
export const login = (data) => {
  return request({
    method: "post",
    url: "/v1_0/authorizations",
    data,
  });
};
// 获取验证码
export const getSmsCode = (mobile) => {
  return request({
    method: "get",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};

// 获取用户信息
export const fetchUserInfo = () => {
  return request({
    method: "get",
    url: "/v1_0/user",
  });
};
