import axios from 'axios';

export default {
  methods: {
    setAuth(res, successMsg, errorMsg) {
      if (res && res.data.success) {
        localStorage.setItem('data', JSON.stringify(res.data.data));

        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + res.data.data;
        this.$noty.success(successMsg);
        this.$router.push('/');
      } else {
        this.$noty.error(errorMsg);
      }
    }
  }
};
