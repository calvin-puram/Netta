<template>
  <v-text-field
    v-model="model"
    :label="label"
    :rules="nameRules"
    required
  ></v-text-field>
</template>

<script>
export default {
  props: ['model', 'label'],
  data() {
    return {
      nameRules: [v => !!v || 'Name is required']
    };
  }
};
</script>
