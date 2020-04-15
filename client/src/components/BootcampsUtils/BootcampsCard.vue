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
              :src="`${bootcamp.photo}`"
              class="card-img"
              alt="bootcamp image"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
                <router-link v-if="getToken" :to="`bootcamp/${bootcamp.slug}`">
                  <div class="col-md-6 col-sm-12">
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
                  ><div class="col-md-6 col-sm-12">
                    <span>{{ bootcamp.name }}</span>
                    <!-- display ratings star -->
                    <v-rating
                      class="float-right"
                      v-model="bootcamp.averageRating"
                      background-color="purple lighten-3"
                      color="teal"
                      small
                    ></v-rating>
                    <!-- end display ratings star -->
                  </div>
                </router-link>
              </h5>
              <!-- display location details -->
              <span class="badge badge_location badge-dark mb-2"
                >{{ bootcamp.location.state }},
                {{ bootcamp.location.country }}</span
              >
              <!-- end of location details -->
              <!-- display careers -->
              <p class="card-text bootcamp_careers">
                {{ bootcamp.careers.join(', ') }}
              </p>
              <!-- end of careers -->
            </div>
            <div class="float-right">
              <!-- edit bootcamp -->
              <div
                v-if="
                  getAuthUser.role === 'admin' ||
                    getAuthUser._id === bootcamp.user
                "
              >
                <router-link
                  :to="
                    `/bootcamp/${bootcamp._id}/${bootcamp.slug}/bootcamp_edit`
                  "
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-chip v-on="on" link color="teal"
                        ><BaseIcon prop="fas fa-pencil-alt mr-1"
                      /></v-chip>
                    </template>
                    <span>Edit</span>
                  </v-tooltip>
                </router-link>
              </div>

              <!-- end of edit bootcemp -->
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

/* mobile phone screen sm <= 425px */
@media screen and (max-width: 425px) {
  .card-img {
    margin-top: 1rem;
  }

  a div {
    text-align: center;
  }

  .badge_location,
  .bootcamp_careers {
    margin: 1rem 0;
  }
}
</style>
