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

.showcase {
  position: relative;
  background: url('/img/showcase.jpg') no-repeat center center/cover;
  min-height: 100vh;
  color: #fff;
}

.showcase-inner {
  text-align: center;
  padding-top: 20%;
  height: 100%;
  width: 80%;
  margin: auto;
}

.dark-overlay {
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#nprogress .bar {
  background: #fff !important;

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 3px !important;
}
</style>
