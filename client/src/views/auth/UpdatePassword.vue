<template>
  <section class="form container mt-5">
    <div class="row">
      <div class="col-md-6 m-auto">
        <div class="card bg-white py-2 px-2">
          <div class="card-body">
            <h4 class="text-center mb-2 text-secondary">Update Password</h4>
            <form @submit.prevent="handleUpdatePassword">
              <div class="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  v-model="passwordCurrent"
                  class="form-control"
                  placeholder="Current Password"
                />
              </div>
              <div class="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  placeholder="New Password"
                />
              </div>
              <div class="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  v-model="passwordConfirm"
                  class="form-control"
                  placeholder="Confirm Password"
                />
              </div>

              <div class="form-group">
                <BaseButton name="Update Password" :loading="loading" />
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
      passwordCurrent: '',
      password: '',
      passwordConfirm: ''
    };
  },
  methods: {
    ...mapActions(['updateAuthUserPassword']),
    handleUpdatePassword() {
      this.toggleLoading();
      const data = {
        currentPassword: this.passwordCurrent,
        newPassword: this.password,
        passwordConfirm: this.passwordConfirm
      };
      this.updateAuthUserPassword(data).then(res => {
        this.toggleLoading();
        if (res && res.data.success) {
          this.$noty.success('User Password Updated Successfully!');
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
