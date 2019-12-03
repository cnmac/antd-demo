import Vue from "vue";
import Antd from "ant-design-vue";
import { message } from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.less";

Vue.config.productionTip = false;

Vue.use(Antd);

//路由守卫，后端再添加token验证功能
router.beforeEach((to, from, next) => {
  if (to.fullPath !== "/login" && store.state.token === ""){
    message.warn("请先进行登录操作", 0.5)
    next("/login")
  } else {
    next()
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
