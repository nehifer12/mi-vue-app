import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import baseDatos from "@/baseDatos";
baseDatos.init();

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount("#app")
