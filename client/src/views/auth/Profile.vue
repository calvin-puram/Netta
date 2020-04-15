<template>
  <section class="container mt-5" v-if="!loading">
    <div class="row">
      <div class="col-md-8 m-auto">
        <div class="card bg-white py-2 px-4">
          <div class="card-body">
            <h1 class="mb-2 text-secondary profile_heading">Manage Account</h1>
            <v-form ref="form" v-model="valid" @submit.prevent="updateDetails">
              <!-- NAME -->
              <v-text-field
                v-model="name"
                label="Name"
                :rules="nameRules"
                required
              ></v-text-field>

              <!-- EMAIL -->
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-Mail"
                required
              ></v-text-field>

              <div class="form-group">
                <div class="row">
                  <div class="col-md-6">
                    <BaseButton name="Save" :loading="getAuthLoading" />
                  </div>
                  <div class="col-md-6">
                    <router-link to="/update_password">
                      <BaseButton name="Update Password" />
                    </router-link>
                  </div>
                </div>
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
import NProgress from 'nprogress';
import LoadingMixin from '@mixins/LoadingMixins';

export default {
  mixins: [LoadingMixin],
  computed: mapGetters(['getAuthUser', 'getErr', 'getAuthLoading']),
  data() {
    return {
      valid: true,
      name: '',
      email: '',
      nameRules: [v => !!v || 'Name is required'],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    };
  },
  methods: {
    ...mapActions(['updateUserDetails']),
    updateDetails() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;

        const data = {
          name: this.name,
          email: this.email
        };
        this.updateUserDetails(data).then(res => {
          if (res && res.data.success) {
            this.$noty.success('User Details Updated Successfully!');
          } else {
            this.$noty.error(this.getErr);
          }
        });
      }
    }
  },
  created() {
    this.toggleLoading();
    NProgress.start();
    this.name = this.getAuthUser.name;
    this.email = this.getAuthUser.email;
    NProgress.done();
    this.toggleLoading();
  }
};
</script>

<style scoped>
/* mobile phone screen sm <= 425px */
@media screen and (max-width: 425px) {
  h1 {
    font-size: 20px;
    text-align: center;
    padding: 1rem 0;
  }
}
</style>
