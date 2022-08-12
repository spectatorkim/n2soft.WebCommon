import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;

/* Vue 인스턴스에서 axios 를 $http 로 사용하기 위한 등록 */
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
