import api from "@/api/index";

export function UserLogin(data) {
  let url = "/user/login";
  return api.Post(url, data);
}

export function UserInfo(params) {
  let url = "/user/userinfo";
  return api.Get(url, params);
}
