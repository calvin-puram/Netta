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
            v-if="singleBootcamp"
          >
            <BaseIcon prop="fas fa-chevron-left mr-1" />Bootcamp Info</v-btn
          >

          <h3 class="mb-4 text-secondary">{{ singleBootcamp.name }} Reviews</h3>
          <div v-for="bootcamp in getBootcampReviews" :key="bootcamp._id">
            <!-- Reviews -->
            <div class="card mb-3">
              <h5 class="card-header dark-bg text-white">
                {{ bootcamp.title }}
              </h5>
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
                <p class="text-muted">Writtern By {{ bootcamp.user.name }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Sidebar -->
        <div class="col-md-4 sidebar">
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
          <v-btn class="my-3" block color="teal" dark link to="/">
            <BaseIcon prop="fas fa-pencil-alt mr-2" />
            Review This Bootcamp</v-btn
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from '@store/index';
import NProgress from 'nprogress';
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters(['getBootcampReviews', 'singleBootcamp']),

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
</style>
