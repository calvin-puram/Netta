<template>
  <v-checkbox
    :v-model="model"
    :label="label"
    color="success"
    hide-details
  ></v-checkbox>
</template>

<script>
export default {
  props: ['label', 'model']
};
</script>
