<template>
  <section class="browse my-5" v-if="!loading">
    <div class="container">
      <div class="row">
        <!-- Sidebar -->
        <div class="col-md-4" v-if="getBootcamps.data">
          <div class="card card-body mb-4">
            <h4 class="mb-3">By Location</h4>
            <LocationFilter />
          </div>

          <h4>Filter</h4>
          <OtherFilter />
        </div>
        <!-- Main col -->
        <div class="col-md-8 bootcamps">
          <!-- Bootcamps -->
          <div v-for="bootcamps in getBootcamps.data" :key="bootcamps._id">
            <BootcampCard :bootcamp="bootcamps" />
          </div>

          <!-- Pagination -->

          <BootcampNav :bootcamps="getBootcamps" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LocationFilter from '@bootcampsUtils/LocationFilter';
import OtherFilter from '@bootcampsUtils/OtherFilters';
import BootcampCard from '@bootcampsUtils/BootcampsCard';
import BootcampNav from '@bootcampsUtils/BootcampNav';
import LoadingMixin from '@mixins/LoadingMixins';
import { mapGetters, mapActions } from 'vuex';
import NProgress from 'nprogress';
import store from '@store/index';

export default {
  mixins: [LoadingMixin],
  components: {
    LocationFilter,
    OtherFilter,
    BootcampCard,
    BootcampNav
  },
  computed: mapGetters(['getBootcamps']),
  methods: {
    ...mapActions(['getAllBootcamps'])
  },
  created() {
    this.toggleLoading();
    NProgress.start();
    this.getAllBootcamps().then(res => {
      if (res && res.data.success) {
        NProgress.done();
        this.toggleLoading();
      }
    });
  }
};
</script>

<style scoped>
/* mobile phone screen sm <= 425px */
@media screen and (max-width: 425px) {
  .bootcamps {
    margin-top: 3rem;
  }
}
</style>
