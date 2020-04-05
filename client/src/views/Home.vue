<template>
  <div>
    <Showcase />

    <BootcampLatest :getLatestBootcamps="getLatestBootcamps" />
  </div>
</template>

<script>
import Showcase from '../components/Layouts/Showcase';
import BootcampLatest from '../components/HomeUtils/BootcampLatest';
import { mapActions, mapGetters } from 'vuex';
import NProgress from 'nprogress';
import store from '../store/index';

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
      if (res && res.data.success) {
        NProgress.done();
      }
    });
    next();
  },
  methods: {
    ...mapActions(['SortBootcamps'])
  }
};
</script>
