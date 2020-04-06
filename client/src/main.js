import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'nprogress/nprogress.css';
import VueNoty from 'vuejs-noty';
import 'vuejs-noty/dist/vuejs-noty.css';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
const token = JSON.parse(localStorage.getItem('token')) || '';
Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
Vue.use(VueNoty);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
