<template>
  <section class="form container mt-5">
    <div class="row">
      <div class="col-md-6 m-auto">
        <div class="card bg-white py-2 px-2">
          <div class="card-body">
            <h4 class="text-center mb-2 text-secondary">Reset Password</h4>

            <v-form
              ref="form"
              v-model="valid"
              @submit.prevent="handleUpdatePassword"
            >
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="New Password"
                hint="At least 6 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>

              <v-text-field
                v-model="passwordConfirm"
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show3 ? 'text' : 'password'"
                name="input-10-3"
                label="Confirm Password"
                hint="At least 6 characters"
                counter
                @click:append="show3 = !show3"
              ></v-text-field>

              <div class="form-group mt-4">
                <BaseButton :loading="loading" name="Update Password" />
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
import authMixin from '@mixins/authMixin';
import LoadingMixin from '@mixins/LoadingMixins';

export default {
  props: ['token'],
  computed: mapGetters(['getAuthErr']),
  mixins: [authMixin, LoadingMixin],
  data() {
    return {
      valid: true,
      password: '',
      passwordConfirm: '',
      show1: false,
      show3: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters'
      }
    };
  },
  methods: {
    ...mapActions(['updatePassword']),
    handleUpdatePassword() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;

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
  }
};
</script>

<style scoped>
.form {
  margin: 6rem 0 !important;
}
</style>
