<template>
  <v-app>
    <Navbar />
    <v-content>
      <router-view :key="$route.fullpath" />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from './components/Layouts/Navbar';
import Footer from '@layouts/Footer';

export default {
  name: 'App',

  components: {
    Navbar,
    Footer
  }
};
</script>

<style>
a {
  text-decoration: none !important;
}
</style>
