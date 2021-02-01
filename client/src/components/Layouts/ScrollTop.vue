<template>
  <v-btn
    v-scroll="onScroll"
    v-show="fab"
    fab
    dark
    fixed
    bottom
    right
    class="scrollTop"
    @click="toTop"
  >
    <BaseIcon prop="fas fa-chevron-up" />
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      fab: false
    };
  },
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  }
};
</script>

<style lang="scss" scoped>
.theme--dark.v-btn.v-btn--has-bg {
  background: #181f44 !important;
}
</style>
