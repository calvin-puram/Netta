<template>
  <v-expansion-panels
    class="mb-3"
    v-if="bootcamp && bootcamp.courses.length > 0"
  >
    <v-expansion-panel>
      <v-expansion-panel-header hide-actions>
        <div class="row no-gutters">
          <div class="col-md-4">
            <img
              v-if="bootcamp.photo === 'no-photo.jpg'"
              :src="`/img/${bootcamp.photo}`"
              class="card-img mt-3"
              alt="bootcamp image"
            />
            <img
              v-else
              :src="`${bootcamp.photo}`"
              class="card-img mt-3"
              alt="bootcamp image"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
                <router-link v-if="getToken" :to="`bootcamp/${bootcamp.slug}`">
                  <div class="row ">
                    <div class="col-md-6 col-sm-12 mx-auto">
                      <span class="text-dark name-hover">{{
                        bootcamp.name
                      }}</span>
                    </div>
                    <div class="col-md-6 col-sm-12 mx-auto">
                      <v-rating
                        v-model="bootcamp.averageRating"
                        background-color="purple lighten-3"
                        color="teal"
                        small
                      ></v-rating>
                    </div>
                  </div>
                </router-link>

                <router-link
                  v-if="!getToken"
                  to="/login"
                  class="bootcamp__name"
                >
                  <div class="row ">
                    <div class="col-md-6 col-sm-12 mx-auto">
                      <span class=" name-hover">{{ bootcamp.name }}</span>
                    </div>
                    <div class="col-md-6 col-sm-12 mx-auto">
                      <v-rating
                        v-model="bootcamp.averageRating"
                        background-color="purple lighten-3"
                        color="#181f44"
                        small
                      ></v-rating>
                    </div>
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
              <p class="card-text bootcamp_careers mt-5">
                {{ bootcamp.careers.join(', ') }}
              </p>
              <!-- end of careers -->
            </div>
            <div class="row mt-3 ml-12">
              <!-- delete -->
              <div class="col-md-6">
                <!-- display delete icon for admin and publisher only -->
                <div
                  v-if="
                    getAuthUser.role === 'admin' ||
                      getAuthUser._id === bootcamp.user
                  "
                >
                  <!-- delete bootcamp -->
                  <div v-if="getToken" @click="handleDeleteBootcamp">
                    <BaseIcon prop="fas fa-spin fa-spinner " v-if="loading" />
                    <BaseIcon prop="fas fa-trash dark-bg" v-else />
                  </div>
                </div>
              </div>

              <!-- edit -->
              <div class="col-md-6">
                <!-- edit bootcamp -->
                <div
                  v-if="
                    getAuthUser.role === 'admin' ||
                      getAuthUser._id === bootcamp.user
                  "
                >
                  <router-link
                    v-if="getToken"
                    :to="
                      `/bootcamp/${bootcamp._id}/${bootcamp.slug}/bootcamp_edit`
                    "
                  >
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <div v-on="on">
                          <BaseIcon prop="fas fa-pencil-alt mr-1" />
                        </div>
                      </template>
                      <span>Edit</span>
                    </v-tooltip>
                  </router-link>
                </div>

                <!-- end of edit bootcemp -->
              </div>
            </div>
          </div>
        </div>
      </v-expansion-panel-header>
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
  computed: mapGetters(['getToken', 'getErr', 'getAuthUser', 'getPhoto']),
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
.bootcamp__name {
  color: #333 !important;
}

.fas {
  color: #fff;
}

.name-hover:hover {
  color: #333 !important;
}



.dark-bg,
.fa-pencil-alt {
  color: #181f44 !important;
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
