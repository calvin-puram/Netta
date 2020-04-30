<template>
  <v-app>
    <Navbar />
    <v-content>
      <router-view :key="$route.fullpath" />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Layouts/Navbar';

export default {
  name: 'App',

  components: {
    Navbar
  },

  data: () => ({
    //
  })
};
</script>

<style>
a {
  text-decoration: none !important;
  color: #fff !important;
}
</style>
