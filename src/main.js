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

Vue.component("TouTiaoIcon", TouTiaoIcon);
Vue.config.productionTip = false;

// 引入dayjs格式化日期
import "@/utils/dayjs";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
