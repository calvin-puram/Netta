<template>
  <section class="form container mt-5">
    <div class="row">
      <div class="col-md-6 m-auto">
        <div class="card bg-white py-2 px-2">
          <div class="card-body">
            <h4 class="text-center mb-2 text-secondary">Update Password</h4>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="passwordCurrent"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Current Password"
                hint="At least 6 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show2 ? 'text' : 'password'"
                name="input-10-2"
                label="New Password"
                hint="At least 6 characters"
                counter
                @click:append="show2 = !show2"
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

              <div
                class="form-group mt-4"
                @click.prevent="handleUpdatePassword"
              >
                <BaseButton name="Update Password" :loading="loading" />
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
      passwordCurrent: '',
      password: '',
      passwordConfirm: '',
      valid: true,
      show1: false,
      show2: false,
      show3: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters'
      }
    };
  },
  methods: {
    ...mapActions(['updateAuthUserPassword']),
    handleUpdatePassword() {
      if (this.$refs.form.validate()) {
        this.toggleLoading();
        this.snackbar = true;

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
  }
};
</script>

<style scoped>
.form {
  margin-top: 6rem !important;
}
</style>
