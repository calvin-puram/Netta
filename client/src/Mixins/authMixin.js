import axios from 'axios';

export default {
  methods: {
    setAuth(res, successMsg, errorMsg) {
      if (res && res.data.success) {
        localStorage.setItem('token', JSON.stringify(res.data.data));
        axios.defaults.headers.common['Authorization'] = res.data.data;
        this.$noty.success(successMsg);
        this.$router.push('/');
      } else {
        this.$noty.error(errorMsg);
      }
    }
  }
};
