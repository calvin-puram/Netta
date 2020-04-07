import axios from 'axios';

const state = {
  token: JSON.parse(localStorage.getItem('token')) || '',
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
      const res = await axios.post('/api/v1/auth/register', data);
      if (res && res.data.success) {
        commit('auth_res', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('auth_err', err.response.data.error);
      }
    }
  },

  // login
  async login({ commit }, data) {
    try {
      const res = await axios.post('/api/v1/auth/login', data);
      if (res && res.data.success) {
        commit('auth_res', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('auth_err', err.response.data.error);
      }
    }
  },

  // Resit password
  async reset({ commit }, email) {
    try {
      const res = await axios.post('/api/v1/auth/forgetpassword', email);
      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('auth_err', err.response.data.error);
      }
    }
  },

  // update
  async updatePassword({ commit }, data) {
    try {
      const res = await axios.patch(
        `/api/v1/auth/resetpassword/${data.token}`,
        data
      );
      if (res && res.data.success) {
        commit('auth_res', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('auth_err', err.response.data.error);
      }
    }
  },
  // Logout
  async logout({ commit }) {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    commit('logout_res');
  }
};
const mutations = {
  auth_res(state, token) {
    state.token = token;
    state.authErr = null;
  },

  auth_err(state, err) {
    state.authErr = err;
  },

  logout_res(state) {
    state.token = '';
    state.authErr = null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
