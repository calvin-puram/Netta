<template>
  <div>
    <Showcase />
    <BootcampLatest />
  </div>
</template>

<script>
import Showcase from '../components/Layouts/Showcase';
import BootcampLatest from '../components/HomeUtils/BootcampLatest';
export default {
  name: 'Home',
  components: {
    Showcase,
    BootcampLatest
  }
};
</script>
