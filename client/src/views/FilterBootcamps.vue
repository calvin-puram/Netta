<template>
  <div>
    <BootcampLatest :getLatestBootcamps="getBootcamps" />
  </div>
</template>

<script>
import BootcampLatest from '../components/HomeUtils/BootcampLatest';
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters(['getBootcamps']),
  components: {
    BootcampLatest
  }
};
</script>
