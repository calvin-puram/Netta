import axios from 'axios';

const state = {
  token: localStorage.getItem('token') || '',
  authErr: null
};
const getters = {
  getToken: () => !!state.token,
  getAuthErr: () => state.authErr
};
const actions = {
  // Register
  async register({ commit }, data) {
    try {
      console.log(data);
      const res = await axios.post('/api/v1/auth/register', data);
      if (res && res.data.success) {
        localStorage.setItem('token', res.data.data);
        axios.defaults.headers.common['Authorization'] = res.data.data;
        commit('auth_res', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('auth_err', err.response.data.error);
      }
    }
  }
};
const mutations = {
  auth_res(state, token) {
    state.token = token;
    state.authErr = null;
  },

  auth_err(state, err) {
    state.authErr = err;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
