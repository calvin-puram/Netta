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
                  <BaseButton :loading="loading" name="Register" />
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
import authMixin from '@mixins/authMixin';

export default {
  computed: mapGetters(['getAuthErr']),
  mixins: [LoadingMixin, authMixin],
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
        this.setAuth(res, 'User Registered successfully!', this.getAuthErr);
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
