<template>
  <button
    type="submit"
    :disabled="loading"
    class="btn btn-outline-light  btn-block"
  >
    {{ name }}
    <span v-if="loading"><BaseIcon prop="fas fa-spin fa-spinner ml-2"/></span>
  </button>
</template>

<script>
export default {
  props: ['loading', 'name']
};
</script>

<style scoped>
.btn {
  background-color: #181f44 !important;
  color: #fff !important;
}
</style>
