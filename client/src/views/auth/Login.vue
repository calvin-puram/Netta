<template>
  <section class="form mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6 m-auto">
          <div class="card bg-white p-2 mb-2">
            <div class="card-body">
              <h4 class="text-center mb-2 text-secondary">
                <BaseIcon prop="fas fa-sign-in-alt" />
                Login
              </h4>
              <p>
                Log in to list your bootcamp or rate, review and favorite
                bootcamps
              </p>

              <v-form ref="form" v-model="valid" @submit.prevent="handleLogin">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label=" Password"
                  hint="At least 6 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>

                <div class="form-group mt-4">
                  <BaseButton :loading="loading" name="Login" />
                </div>
              </v-form>
              <p>
                Forgot Password?
                <router-link :to="{ name: 'forgotPassword' }"
                  >Reset Password</router-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoadingMixin from '@mixins/LoadingMixins';
import authMixin from '@mixins/authMixin';

export default {
  computed: mapGetters(['getAuthErr']),
  mixins: [LoadingMixin, authMixin],
  data() {
    return {
      valid: true,
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      show1: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters'
      }
    };
  },
  methods: {
    ...mapActions(['login']),
    handleLogin() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;

        this.toggleLoading();
        const data = {
          email: this.email,
          password: this.password
        };
        this.login(data).then(res => {
          this.toggleLoading();
          this.setAuth(res, 'User Logged In successfully!', this.getAuthErr);
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
