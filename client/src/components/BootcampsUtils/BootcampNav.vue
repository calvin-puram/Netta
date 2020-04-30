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
      currentPage: 1,
      totalPages: 10
    };
  },
  methods: {
    pageChangeHandler(selectedPage) {
      this.currentPage = selectedPage;
    }
  }
};
</script>
