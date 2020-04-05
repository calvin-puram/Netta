import axios from 'axios';

const state = {
  bootcamps: [],
  latestBootcamps: [],
  err: null
};
const getters = {
  getBootcamps: () => state.bootcamps,
  getLatestBootcamps: () => state.latestBootcamps,
  getErr: () => state.err
};
const actions = {
  // all bootcamps
  async getAllBootcamps({ commit }) {
    try {
      const res = await axios.get('/api/v1/bootcamps');
      if (res && res.data.success) {
        commit('bootcamp_res', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('bootcamp_err', err.response.data.error);
      }
    }
  },

  //get bootcamps by radius
  async getBootcampsByRadius({ commit }, data) {
    try {
      const res = await axios.get(
        `/api/v1/bootcamps/radius/200/${data.lng}/${data.lat}/km`
      );
      if (res && res.data.success) {
        commit('bootcamp_res', res.data.bootcamps);
      }
      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('bootcamp_err', err.response.data.error);
      }
    }
  },
  //get bootcamps by ratings and budget
  async getBootcampsByFilter({ commit }, data) {
    try {
      const res = await axios.get(
        `/api/v1/bootcamps?averageCost[gte]=${data.bgt}&averageRating[gte]=${data.rtn}`
      );
      if (res && res.data.success) {
        commit('bootcamp_res', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('bootcamp_err', err.response.data.error);
      }
    }
  },
  // sort bootcamps
  async SortBootcamps({ commit }) {
    try {
      const res = await axios.get('/api/v1/bootcamps?sort=createdAt');
      if (res && res.data.success) {
        commit('bootcampLatest_res', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('bootcamp_err', err.response.data.error);
      }
    }
  }
};
const mutations = {
  bootcamp_res(state, data) {
    state.bootcamps = data;
    state.err = null;
  },

  bootcamp_err(state, error) {
    state.err = error;
  },

  bootcampLatest_res(state, data) {
    state.latestBootcamps = data.splice(0, 5);
    state.err = null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
