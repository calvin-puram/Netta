<template>
  <div class="text-center mt-12">
    <v-pagination
      v-model="page"
      :length="bootcamps.paginate.totalPage"
      :value="page"
      light
      @input="pageChangeHandler"
      color="teal"
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
