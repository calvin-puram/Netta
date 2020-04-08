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
              <form @submit.prevent="handleLogin">
                <div class="form-group">
                  <label for="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    placeholder="Enter email"
                    v-model="email"
                    required
                  />
                </div>
                <div class="form-group mb-4">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    class="form-control"
                    placeholder="Enter password"
                    v-model="password"
                    minlength="8"
                    required
                  />
                </div>
                <div class="form-group">
                  <BaseButton :loading="loading" name="Login" />
                </div>
              </form>
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
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    handleLogin() {
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
};
</script>

<style scoped>
.form {
  margin-top: 6rem !important;
}
</style>
