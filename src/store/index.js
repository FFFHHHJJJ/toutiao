import Vue from "vue";
import Vuex from "vuex";
import { getLocal, setLocal } from "@/utils/storage";
Vue.use(Vuex);
const tokenKey = "toutiao_token";
export default new Vuex.Store({
  state: {
    user: getLocal(tokenKey),
  },
  getters: {},
  mutations: {
    getToken(state, user) {
      state.user = user;
      // localStorage.setItem(tokenKey, JSON.stringify(user));
      setLocal(tokenKey, user);
    },
  },
  actions: {},
  modules: {},
});
