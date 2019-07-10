import Vue from "vue";
import VCharts from 'v-charts'
import './plugins/vuetify'
import common from './plugins/common'
import App from "./App.vue";
import router from "./router/";
import store from "./store";
import "./registerServiceWorker";
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false;
Vue.use(common);
Vue.use(VCharts);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
