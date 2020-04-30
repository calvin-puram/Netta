<template>
  <div class="mt-12 text-center">
    <sliding-pagination
      :current="currentPage"
      :total="totalPages"
      @page-change="pageChangeHandler"
    ></sliding-pagination>
  </div>
</template>

<script>
import SlidingPagination from 'vue-sliding-pagination';

export default {
  components: {
    SlidingPagination
  },
  props: ['bootcamps'],
  data() {
    return {
      currentPage: this.bootcamps.paginate.page,
      totalPages: this.bootcamps.paginate.totalPage
    };
  },
  methods: {
    pageChangeHandler(selectedPage) {
      this.currentPage = selectedPage;
      console.log(this.currentPage);
    }
  },
  created() {}
};
</script>
