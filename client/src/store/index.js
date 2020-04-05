import Vue from 'vue';
import Vuex from 'vuex';
import bootcamps from './modules/bootcamps';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bootcamps
  }
});
