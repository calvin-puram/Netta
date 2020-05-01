<template>
  <v-app>
    <Navbar />
    <v-content>
      <router-view :key="$route.fullpath" />
    </v-content>
    <ScrollTop />
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

<style>
a {
  text-decoration: none !important;
}
</style>
