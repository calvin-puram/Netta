<template>
  <v-app>
    <Navbar />
    <v-content>
      <router-view :key="$route.fullpath" />
      <ScrollTop />
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import Navbar from './components/Layouts/Navbar';
import Footer from '@layouts/Footer';
import ScrollTop from '@layouts/ScrollTop';

export default {
  name: 'App',

  components: {
    Navbar,
    Footer,
    ScrollTop
  }
};
</script>

<style lang="scss">
a {
  text-decoration: none !important;
}

.join {
  display: block;
}

.bg-color {
  background: #181f44 !important;
}

#nprogress .bar {
  background: #fff !important;
}

#nprogress .spinner-icon {
  border: solid 2px transparent !important;
  border-top-color: #fff !important;
  border-left-color: #fff !important;
  border-radius: 50%;
}
</style>
