import axios from 'axios';

const state = {
  bootcamps: [],
  err: null
};
const getters = {
  getBootcamps: () => state.bootcamps
};
const actions = {
  async getAllBootcamps({ commit }) {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/bootcamps');
      if (res && res.data.success) {
        console.log(res.data.data);
        commit('bootcamp_res', res.data.data);
      }
    } catch (err) {
      console.log(err.response.msg);
      commit('bootcamp_err', err.response.msg);
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
