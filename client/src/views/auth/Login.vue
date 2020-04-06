<template>
  <section class="form mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6 m-auto">
          <div class="card bg-white p-2 mb-2">
            <div class="card-body">
              <h4 class="text-center mb-2">
                <i class="fas fa-sign-in-alt"></i> Login
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
                  <button
                    type="submit"
                    :disabled="loading"
                    class="btn btn-primary btn-block"
                  >
                    Login
                    <i class="fas fa-spin fa-spinner ml-2" v-if="loading"></i>
                  </button>
                </div>
              </form>
              <p>
                Forgot Password?
                <a href="reset-password.html">Reset Password</a>
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

export default {
  computed: mapGetters(['getAuthErr']),
  data() {
    return {
      email: '',
      password: '',
      loading: false
    };
  },
  methods: {
    ...mapActions(['login']),
    toggleLoading() {
      this.loading = !this.loading;
    },
    handleLogin() {
      this.toggleLoading();
      const data = {
        email: this.email,
        password: this.password
      };
      this.login(data).then(res => {
        this.toggleLoading();
        if (res && res.data.success) {
          this.$noty.success('User Logged In successfully!');
          this.$router.push('/');
        } else {
          this.$noty.error(this.getAuthErr);
        }
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
