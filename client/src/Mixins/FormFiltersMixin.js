export default {
  methods: {
    setBootcamps(res, successMsg, errorMsg) {
      if (res && res.data.data.length > 0) {
        this.$noty.success(successMsg);
      } else {
        if (errorMsg) {
          this.$noty.error(errorMsg);
        } else {
          this.$noty.error('bootcamps not found');
        }
      }
    }
  }
};
