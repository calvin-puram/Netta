<template>
  <div
    class="text-center mt-12"
    v-if="bootcamps.paginate.totalPage && bootcamps.paginate.totalPage > 1"
  >
    <v-pagination
      v-model="page"
      :length="
        bootcamps.paginate.totalPage > 0 ? bootcamps.paginate.totalPage : 1
      "
      :value="page"
      light
      @input="pageChangeHandler"
      color="#181f44"
      circle
    ></v-pagination>
  </div>
</template>

<script>
import NProgress from 'nprogress';
import { mapActions } from 'vuex';

export default {
  props: ['bootcamps'],
  data() {
    return {
      page: this.bootcamps.paginate.page
    };
  },
  methods: {
    ...mapActions(['getAllBootcampsByPage']),
    pageChangeHandler() {
      NProgress.start();
      this.getAllBootcampsByPage(this.page).then(() => {
        NProgress.done();
      });
    }
  }
};
</script>

<style scoped>
a {
  color: #fff !important;
}
</style>
