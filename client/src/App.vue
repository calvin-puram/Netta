<template>
  <div>
    <div>
      <Navbar />
    </div>
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Layouts/Navbar';
export default {
  components: {
    Navbar
  }
};
</script>

<style>
img {
  width: 100%;
}

#nprogress .bar {
  background: #000 !important;

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 3px !important;
}
</style>
