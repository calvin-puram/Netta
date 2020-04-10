<template>
  <v-text-field
    :v-model="model"
    :rules="emailRules"
    :label="label"
    required
  ></v-text-field>
</template>

<script>
export default {
  props: ['label', 'model'],
  data() {
    return {
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    };
  }
};
</script>
