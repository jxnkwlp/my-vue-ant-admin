import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import config from "./config";

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd);

// import NProgress from 'nprogress'
// Vue.use(NProgress)
// Vue.prototype.$nprogress = NProgress

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
