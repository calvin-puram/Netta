import axios from 'axios';

const state = {
  bootcamps: [],
  latestBootcamps: [],
  singleBootcamp: {},
  bootcampReviews: [],
  singleReview: {},
  err: null
};
const getters = {
  getBootcamps: () => state.bootcamps,
  getLatestBootcamps: () => state.latestBootcamps,
  singleBootcamp: () => state.singleBootcamp,
  getBootcampReviews: () => state.bootcampReviews,
  getSingleReview: () => state.singleReview,
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

  //create bootcamp
  async createBootcamps({ commit }, data) {
    try {
      const res = await axios.post('/api/v1/bootcamps', data);

      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('bootcamp_err', err.response.data.error);
      }
    }
  },

  // single bootcamps
  async SingleBootcamps({ commit }, slug) {
    try {
      const res = await axios.get(`/api/v1/bootcamps/${slug}`);
      if (res && res.data.success) {
        commit('singleBootcamp_res', res.data.data);
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
  },
  //  bootcamps reviews
  async bootcampReviews({ commit }, id) {
    try {
      const res = await axios.get(`/api/v1/bootcamps/${id}/reviews`);
      if (res && res.data.success) {
        commit('bootcampReviews_res', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('bootcamp_err', err.response.data.error);
      }
    }
  },
  //  create reviews
  async createReviews({ commit }, data) {
    try {
      const res = await axios.post(`/api/v1/reviews`, data);

      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('bootcamp_err', err.response.data.error);
      }
    }
  },
  //  get single reviews
  async singleReview({ commit }, id) {
    try {
      const res = await axios.get(`/api/v1/reviews/${id}`);
      if (res && res.data.success) {
        commit('singleReview_res', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('bootcamp_err', err.response.data.error);
      }
    }
  },
  //  edit  reviews
  async editReview({ commit }, data) {
    try {
      const res = await axios.patch(`/api/v1/reviews/${data.id}`, data);
      if (res && res.data.success) {
        commit('singleReview_res', res.data.data);
      }
      return res;
    } catch (err) {
      if (err && err.response.data) {
        commit('bootcamp_err', err.response.data.error);
      }
    }
  },
  //  delete  review
  async deletedReview({ commit }, id) {
    console.log(id);
    try {
      const res = await axios.delete(`/api/v1/reviews/${id}`);

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
  },

  singleBootcamp_res(state, data) {
    state.singleBootcamp = data;
    state.err = null;
  },

  bootcampReviews_res(state, data) {
    state.bootcampReviews = data;
    state.err = null;
  },
  singleReview_res(state, data) {
    state.singleReview = data;
    state.err = null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
