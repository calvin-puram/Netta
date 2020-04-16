<template>
  <div>
    <Showcase />

    <BootcampLatest :getLatestBootcamps="getLatestBootcamps" />
    <Footer />
  </div>
</template>

<script>
import Showcase from '@layouts/Showcase';
import BootcampLatest from '@homeUtils/BootcampLatest';
import Footer from '@layouts/Footer';
import { mapGetters } from 'vuex';
import NProgress from 'nprogress';
import store from '@store/index';

export default {
  name: 'Home',
  computed: mapGetters(['getLatestBootcamps']),
  components: {
    Showcase,
    BootcampLatest,
    Footer
  },
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    store.dispatch('SortBootcamps').then(res => {
      if (res && res.data.success) {
        NProgress.done();
      }
    });
    next();
  }
};
</script>
