<template>
  <button type="submit" :disabled="loading" class="btn btn-primary btn-block">
    {{ name }}
    <i class="fas fa-spin fa-spinner ml-2" v-if="loading"></i>
  </button>
</template>

<script>
export default {
  props: ['loading', 'name']
};
</script>
