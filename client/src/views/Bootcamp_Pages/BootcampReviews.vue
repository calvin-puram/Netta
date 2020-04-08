<template>
  <section class="bootcamp mt-5">
    <div class="container">
      <div class="row">
        <!-- Main col -->
        <div class="col-md-8 ">
          <v-btn
            class="my-3"
            color="teal"
            dark
            link
            :to="`/bootcamp/${singleBootcamp.slug}`"
            v-if="getBootcampReviews && singleBootcamp"
          >
            <BaseIcon prop="fas fa-chevron-left mr-1" />Bootcamp Info</v-btn
          >
          <h3 class="mb-4 text-secondary">{{ singleBootcamp.name }} Reviews</h3>

          <div v-for="bootcamp in getBootcampReviews" :key="bootcamp._id">
            <!-- Reviews -->
            <div class="card mb-3">
              <div
                class="d-flex justify-content-between align-items-center card-header dark-bg text-white"
              >
                <h5>
                  {{ bootcamp.title }}
                </h5>
                <router-link
                  :to="
                    `/bootcamp/${bootcamp._id}/${bootcamp.bootcamp.slug}/editReview`
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

              <div class="card-body">
                <h5 class="card-title">
                  Rating:
                  <span class="text-success">{{
                    bootcamp.rating.toFixed(1)
                  }}</span>
                </h5>
                <p class="card-text">
                  {{ bootcamp.text }}
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <p class="text-muted">Writtern By {{ bootcamp.user.name }}</p>

                  <button
                    :disabled="loading"
                    class="btn dark-bg"
                    @click="deleteReview(bootcamp._id)"
                  >
                    <BaseIcon
                      prop="fas fa-spin fa-spinner ml-2"
                      v-if="loading"
                    />
                    <BaseIcon prop="fas fa-trash mr-1" v-else />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Sidebar -->
        <div
          class="col-md-4 sidebar"
          v-if="getBootcampReviews && singleBootcamp"
        >
          <!-- Rating -->
          <img
            :src="`/img/${singleBootcamp.photo}`"
            class="img-thumbnail"
            alt="bootcamp image"
          />

          <!-- rating -->
          <h3 class="text-center  my-4">
            <v-avatar color="orange" size="62">
              <span class="white--text headline">{{
                singleBootcamp.averageRating.toFixed(1)
              }}</span>
            </v-avatar>
            <span class="text-secondary ml-1">Rating</span>
          </h3>
          <!-- Buttons -->

          <BaseNormalBtn
            :route="
              `/bootcamp/${singleBootcamp._id}/${singleBootcamp.slug}/createReview`
            "
            ><BaseIcon prop="fas fa-pencil-alt mr-2" /> Review This
            Bootcamp</BaseNormalBtn
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from '@store/index';
import NProgress from 'nprogress';
import { mapGetters, mapActions } from 'vuex';
import LoadingMixin from '@mixins/LoadingMixins';

export default {
  computed: mapGetters(['getBootcampReviews', 'singleBootcamp', 'getErr']),
  mixins: [LoadingMixin],
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    store.dispatch('bootcampReviews', to.params.id).then(res => {
      store.dispatch('SingleBootcamps', to.params.slug).then(res => {
        if (res && res.data.success) {
          NProgress.done();
        }
      });
    });
    next();
  },
  methods: {
    ...mapActions(['deletedReview']),
    deleteReview(review) {
      this.toggleLoading();
      this.deletedReview(review).then(res => {
        this.toggleLoading();
        if (res && res.data.success) {
          this.$noty.success('Review deleted Successfully!');
          this.$router.push(`/bootcamp/${this.$route.params.slug}`);
        } else {
          this.$noty.error(this.getErr);
        }
      });
    }
  }
};
</script>

<style scoped>
.bootcamp {
  margin-top: 5rem !important;
}
.sidebar {
  margin-top: 9rem;
}
.dark-bg {
  background: #009688 !important;
}
.fas {
  color: #fff;
}
</style>
