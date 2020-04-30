import axios from 'axios';

const state = {
  token: JSON.parse(localStorage.getItem('data'))
    ? JSON.parse(localStorage.getItem('data')).token
    : '',
  authErr: null,
  authLoading: false,
  user: JSON.parse(localStorage.getItem('data'))
    ? JSON.parse(localStorage.getItem('data')).user
    : {}
};
const getters = {
  getToken: () => !!state.token,
  getAuthErr: () => state.authErr,
  getAuthUser: () => state.user,
  getAuthLoading: () => state.authLoading
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

  // update user details
  async updateUserDetails({ commit }, data) {
    try {
      commit('loading_res');
      const res = await axios.patch(`/api/v1/auth/updatedetails`, data);
      if (res && res.data.success) {
        commit('auth_res', res.data.data);
        commit('loading_req');
      }
      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('auth_err', err.response.data.error);
      }
    }
  },
  // update user password
  async updateAuthUserPassword({ commit }, data) {
    try {
      const res = await axios.patch(`/api/v1/auth/updatepassword`, data);

      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('auth_err', err.response.data.error);
      }
    }
  },
  // Logout
  async logout({ commit }) {
    localStorage.removeItem('data');

    delete axios.defaults.headers.common['Authorization'];
    commit('logout_res');
  }
};
const mutations = {
  auth_res(state, data) {
    state.token = data.token;
    state.authErr = null;
    state.user = data.user;
  },

  auth_err(state, err) {
    state.authErr = err;
    state.authLoading = false;
  },

  loading_res(state) {
    state.authLoading = true;
    state.authErr = null;
  },
  loading_req(state) {
    state.authLoading = false;
    state.authErr = null;
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
