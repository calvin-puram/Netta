<template>
  <section class=" form container mt-5">
    <div class="row">
      <div class="col-md-6 m-auto">
        <div class="card bg-white py-2 px-2">
          <div class="card-body">
            <router-link to="/login">Back to login</router-link>

            <h4 class="text-center mb-2 text-secondary">Forgot Password?</h4>

            <v-form ref="form" v-model="valid" @submit.prevent="handleReset">
              <div>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>

                <div class="form-group mt-3">
                  <BaseButton :loading="loading" name="Reset Password" />
                </div>
              </div>
            </v-form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoadingMixin from '@mixins/LoadingMixins';

export default {
  computed: mapGetters(['getAuthErr']),
  mixins: [LoadingMixin],
  data() {
    return {
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    };
  },
  methods: {
    ...mapActions(['reset']),
    handleReset() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;

        this.toggleLoading();
        this.reset({ email: this.email }).then(res => {
          this.toggleLoading();
          if (res && res.data.success) {
            this.$noty.success('reset password email sent successfully');
            this.$router.push('/');
          } else {
            this.$noty.error(this.getAuthErr);
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.form {
  margin-top: 6rem !important;
}
</style>
