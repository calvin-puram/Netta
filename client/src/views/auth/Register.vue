<template>
  <section class="form mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6 m-auto">
          <div class="card bg-white p-2 mb-2">
            <div class="card-body">
              <h4 class="text-center mb-2 text-secondary">
                <BaseIcon prop="fas fa-user-plus" />
                Register
              </h4>
              <p>
                Register to list your bootcamp or rate, review and favorite
                bootcamps
              </p>

              <v-form
                ref="form"
                v-model="valid"
                @submit.prevent="handleRegister"
              >
                <v-text-field
                  v-model="name"
                  :counter="50"
                  :rules="nameRules"
                  label="Name"
                  required
                ></v-text-field>
                <!-- EMAIL -->
                <BaseEmail label="E-mail" :model="email" />

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

                <div class="card card-body mb-3 mt-3">
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
              </v-form>
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
      passwordConfirm: '',
      role: '',
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters'
      ],

      show1: false,
      show3: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters'
      }
    };
  },
  methods: {
    ...mapActions(['register']),
    handleRegister() {
      if (this.$refs.form.validate()) {
        this.toggleLoading();
        this.snackbar = true;

        const data = {
          name: this.name,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
          role: this.role
        };
        this.register(data).then(res => {
          this.toggleLoading();
          this.setAuth(res, 'User Registered successfully!', this.getAuthErr);
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
