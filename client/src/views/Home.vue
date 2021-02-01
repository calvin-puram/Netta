<template>
  <div>
    <Showcase />
    <Service />
    <About />
    <BootcampLatest :getLatestBootcamps="getLatestBootcamps" />
    <Connect />
  </div>
</template>

<script>
import Showcase from '@layouts/Showcase';
import BootcampLatest from '@homeUtils/BootcampLatest';
import Service from '@layouts/Services';
import About from '@layouts/About';
import Connect from '@layouts/Connect';
import { mapGetters } from 'vuex';
import NProgress from 'nprogress';
import store from '@store/index';

export default {
  name: 'Home',
  computed: mapGetters(['getLatestBootcamps']),
  components: {
    Showcase,
    BootcampLatest,
    Service,
    About,
    Connect
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
