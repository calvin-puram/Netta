<template>
  <section class="container mt-5">
    <div class="row">
      <div class="col-md-8 m-auto">
        <div class="card bg-white py-2 px-4">
          <div class="card-body">
            <h1 class="mb-2 text-secondary">Manage Account</h1>
            <form @submit.prevent="updateDetails">
              <div class="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="title"
                  required
                  v-model="name"
                  class="form-control"
                  placeholder="Name"
                />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  v-model="email"
                  required
                  class="form-control"
                  placeholder="Email"
                />
              </div>
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
            </form>
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
      name: '',
      email: ''
    };
  },
  methods: {
    ...mapActions(['authUser', 'updateUserDetails']),
    updateDetails() {
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
  },
  created() {
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
