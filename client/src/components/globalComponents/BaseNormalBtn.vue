<template>
  <v-btn class="my-3" block color="#181f44" dark link :to="route">
    <slot></slot
  ></v-btn>
</template>

<script>
export default {
  props: ['route']
};
</script>
