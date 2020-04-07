<template>
  <section class="form container mt-5">
    <div class="row">
      <div class="col-md-6 m-auto">
        <div class="card bg-white py-2 px-2">
          <div class="card-body">
            <h4 class="text-center mb-2">Reset Password</h4>
            <form @submit.prevent="handleUpdatePassword">
              <div class="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="password"
                  v-model="password"
                  class="form-control"
                  placeholder="New Password"
                />
              </div>
              <div class="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="newPassword"
                  v-model="passwordConfirm"
                  class="form-control"
                  placeholder="Confirm Password"
                />
              </div>

              <div class="form-group">
                <BaseButton :loading="loading" name="Update Password" />
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
import authMixin from '@mixins/authMixin';
import LoadingMixin from '@mixins/LoadingMixins';

export default {
  props: ['token'],
  computed: mapGetters(['getAuthErr']),
  mixins: [authMixin, LoadingMixin],
  data() {
    return {
      password: '',
      passwordConfirm: ''
    };
  },
  methods: {
    ...mapActions(['updatePassword']),
    handleUpdatePassword() {
      const data = {
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        token: this.token
      };
      this.toggleLoading();
      this.updatePassword(data).then(res => {
        this.toggleLoading();
        this.setAuth(
          res,
          'User Password Updated successfully!',
          this.getAuthErr
        );
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
