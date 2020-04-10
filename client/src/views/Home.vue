<template>
  <div>
    <Showcase />

    <BootcampLatest :getLatestBootcamps="getLatestBootcamps" />
  </div>
</template>

<script>
import Showcase from '@layouts/Showcase';
import BootcampLatest from '@homeUtils/BootcampLatest';
import { mapGetters } from 'vuex';
import NProgress from 'nprogress';
import store from '@store/index';

export default {
  name: 'Home',
  computed: mapGetters(['getLatestBootcamps']),
  components: {
    Showcase,
    BootcampLatest
  },
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    store.dispatch('SortBootcamps').then(res => {
      store.dispatch('authUser').then(res => {
        if (res && res.data.success) {
          NProgress.done();
        }
      });
    });
    next();
  }
};
</script>
