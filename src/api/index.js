import axios from "axios";
import Qs from "qs"; // 处理post请求数据格式
import store from "@/store";
import router from "@/router";
import Vue from "vue";

import { message } from "ant-design-vue";

const $axios = axios.create({
  // 设置超时时间
  timeout: 30000,
  // 基础url，会在请求url中自动添加前置链接
  baseURL: process.env.VUE_APP_BASE_API
});

// 在全局请求和响应拦截器中添加请求状态
// let loading = null;

/**
 * 请求拦截器
 * 用于处理请求前添加loading、判断是否已保存token，并在每次请求头部添加token
 */
$axios.interceptors.request.use(
  config => {
    const token = store.state.token;
    if (token) {
      config.headers.Authorization = token; // 请求头部添加token
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

Vue.prototype.$http = axios; // 这里并发请求以便在组件使用this.$http.all()，https://cn.vuejs.org/v2/cookbook/adding-instance-properties.html

/**
 * 响应拦截器
 * 用于处理loading状态关闭、请求成功回调、响应错误处理
 */
$axios.interceptors.response.use(
  response => {
    const code = response.status;
    // 请求成功返回response.data
    if ((code >= 200 && code < 300) || code === 304) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回401 清除token信息并跳转到登陆页面
          store.commit("DEL_TOKEN");
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        case 404:
          message.error("网络请求不存在");
          break;
        default:
          message.error(error.response.data.message);
      }
    } else {
      // 请求超时或者网络有问题
      if (error.message.includes("timeout")) {
        message.error("请求超时！请检查网络是否正常");
      } else {
        message.error("请求失败，请检查网络是否已连接");
      }
    }
    return Promise.reject(error);
  }
);

// get，post请求方法
export default {
  Post(url, data) {
    return $axios({
      method: "post",
      url: url,
      data: Qs.stringify(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    });
  },

  Get(url, params) {
    return $axios({
      method: "get",
      url: url,
      params
    });
  }
};
