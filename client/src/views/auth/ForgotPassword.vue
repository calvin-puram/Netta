<template>
  <section class=" form container mt-5">
    <div class="row">
      <div class="col-md-6 m-auto">
        <div class="card bg-white py-2 px-2">
          <div class="card-body">
            <router-link to="/login">Back to login</router-link>

            <h4 class="text-center mb-2">Forgot Password?</h4>

            <form @submit.prevent="handleReset">
              <div>
                <div class="form-group">
                  <label>Enter Email</label>
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    v-model="email"
                    required
                    placeholder="Enter Registered Email address"
                  />
                </div>
                <div class="form-group">
                  <BaseButton :loading="loading" name="Reset Password" />
                </div>
              </div>
            </form>
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
      email: ''
    };
  },
  methods: {
    ...mapActions(['reset']),
    handleReset() {
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
};
</script>

<style scoped>
.form {
  margin-top: 6rem !important;
}
</style>
