import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
import TouTiaoIcon from "@/components/TouTiaoIcon";
import vant from "vant";
import "vant/lib/index.less";
Vue.use(vant);
import "amfe-flexible";
// 测试接口
import request from "@/utils/request";
request.get("/v1_0/announcements").then((res) => {
  console.log(res);
});

Vue.component("TouTiaoIcon", TouTiaoIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
