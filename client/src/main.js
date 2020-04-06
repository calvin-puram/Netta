import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'nprogress/nprogress.css';
import VueNoty from 'vuejs-noty';
import 'vuejs-noty/dist/vuejs-noty.css';
import axios from 'axios';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
const token = JSON.parse(localStorage.getItem('token')) || '';
Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
Vue.use(VueNoty);

// automatic compoenent registration

const requireComponent = require.context(
  './components',

  false,

  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  );

  Vue.component(
    componentName,

    componentConfig.default || componentConfig
  );
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
