<template>
  <section class="form mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6 m-auto">
          <div class="card bg-white p-2 mb-2">
            <div class="card-body">
              <h4 class="text-center mb-2">
                <i class="fas fa-user-plus"></i> Register
              </h4>
              <p>
                Register to list your bootcamp or rate, review and favorite
                bootcamps
              </p>
              <form @submit.prevent="handleRegister">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    v-model="name"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    v-model="email"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    v-model="password"
                    class="form-control"
                    placeholder="Enter password"
                    required
                  />
                </div>

                <div class="card card-body mb-3">
                  <h5>User Role</h5>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="role"
                      v-model="role"
                      value="user"
                      checked
                    />
                    <label class="form-check-label">
                      Regular User (Browse, Write reviews, etc)
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="role"
                      v-model="role"
                      value="publisher"
                    />
                    <label class="form-check-label">
                      Bootcamp Publisher
                    </label>
                  </div>
                </div>
                <p class="text-danger">
                  * You must be affiliated with the bootcamp in some way in
                  order to add it to DevCamper.
                </p>
                <div class="form-group">
                  <button
                    type="submit"
                    :disabled="loading"
                    class="btn btn-primary btn-block"
                  >
                    Register
                    <i class="fas fa-spin fa-spinner ml-2" v-if="loading"></i>
                  </button>
                </div>
              </form>
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
export default {
  computed: mapGetters(['getAuthErr']),
  mixins: [LoadingMixin],
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: ''
    };
  },
  methods: {
    ...mapActions(['register']),
    handleRegister() {
      this.toggleLoading();
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,

        role: this.role
      };
      this.register(data).then(res => {
        this.toggleLoading();
        if (res && res.data.success) {
          this.$noty.success('User Registered successfully!');
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
