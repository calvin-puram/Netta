<template>
  <v-expansion-panels
    class="mb-3"
    v-if="bootcamp && bootcamp.courses.length > 0"
    focusable
  >
    <v-expansion-panel>
      <v-expansion-panel-header>
        <div class="d-flex justify-content-between align-items-center">
          {{ bootcamp.name }}

          <!-- display delete icon for admin and publisher only -->
          <div
            v-if="
              getAuthUser.role === 'admin' || getAuthUser._id === bootcamp.user
            "
          >
            <!-- delete bootcamp -->

            <button
              :disabled="loading"
              class="btn dark-bg mr-2"
              @click="handleDeleteBootcamp"
            >
              <BaseIcon prop="fas fa-spin fa-spinner " v-if="loading" />
              <BaseIcon prop="fas fa-trash " v-else />
            </button>
          </div>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div class="row no-gutters">
          <div class="col-md-4">
            <img
              :src="`img/${bootcamp.photo}`"
              class="card-img"
              alt="bootcamp image"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
                <router-link v-if="getToken" :to="`bootcamp/${bootcamp.slug}`">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>{{ bootcamp.name }}</span>

                    <v-rating
                      class="float-right"
                      v-model="bootcamp.averageRating"
                      background-color="purple lighten-3"
                      color="teal"
                      small
                    ></v-rating>
                  </div>
                </router-link>

                <router-link v-if="!getToken" to="/login"
                  ><div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>{{ bootcamp.name }}</span>

                    <v-rating
                      class="float-right"
                      v-model="bootcamp.averageRating"
                      background-color="purple lighten-3"
                      color="teal"
                      small
                    ></v-rating>
                  </div>
                </router-link>
              </h5>
              <span class="badge badge-dark mb-2"
                >{{ bootcamp.location.state }},
                {{ bootcamp.location.country }}</span
              >
              <p class="card-text">
                {{ bootcamp.careers.join(', ') }}
              </p>
            </div>
            <div class="float-right">
              <h1>yes</h1>
            </div>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import store from '@store/index';
import NProgress from 'nprogress';
import LoadingMixin from '@mixins/LoadingMixins';

export default {
  mixins: [LoadingMixin],
  props: ['bootcamp'],
  computed: mapGetters(['getToken', 'getErr', 'getAuthUser']),
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    store.dispatch('authUser').then(res => {
      if (res && res.data.success) {
        NProgress.done();
      }
    });
    next();
  },
  methods: {
    ...mapActions(['deleteBootcamp']),
    handleDeleteBootcamp() {
      this.toggleLoading();
      this.deleteBootcamp(this.bootcamp._id).then(res => {
        this.toggleLoading();
        if (res && res.data.success) {
          this.$noty.success('Bootcamp deleted Successfully!');
          this.$router.push('/manage_bootcamp');
        } else {
          this.$noty.error(this.getErr);
        }
      });
    }
  }
};
</script>

<style scoped>
.dark-bg {
  background: #009688 !important;
}
.fas {
  color: #fff;
}
</style>
