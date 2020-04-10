<template>
  <section class="container mt-5">
    <div class="row">
      <div class="col-md-8 m-auto">
        <div class="card bg-white py-2 px-4">
          <div class="card-body">
            <h1 class="mb-2 text-secondary">Manage Account</h1>
            <v-form ref="form" v-model="valid" @submit.prevent="updateDetails">
              <!-- NAME -->
              <BaseName label="Name" :model="name" />

              <!-- EMAIL -->
              <BaseEmail label="E-mail" :model="email" />

              <div class="form-group">
                <div class="row">
                  <div class="col-md-6">
                    <BaseButton name="Save" :loading="loading" />
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
  computed: mapGetters(['getAuthUser', 'getErr']),
  data() {
    return {
      valid: true,
      name: '',
      email: ''
    };
  },
  methods: {
    ...mapActions(['authUser', 'updateUserDetails']),
    updateDetails() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.toggleLoading();
        const data = {
          name: this.name,
          email: this.email
        };
        this.updateUserDetails(data).then(res => {
          this.toggleLoading();
          if (res && res.data.success) {
            this.$noty.success('User Details Updated Successfully!');
          } else {
            this.$noty.error(this.getErr);
          }
        });
      }
    }
  },
  mounted() {
    NProgress.start();
    this.authUser().then(res => {
      if (res && res.data.success) {
        this.name = this.getAuthUser.name;
        this.email = this.getAuthUser.email;
        NProgress.done();
      }
    });
  }
};
</script>
