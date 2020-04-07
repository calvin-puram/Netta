<template>
  <section class="bootcamp mt-5">
    <div class="container">
      <div class="row">
        <!-- Main col -->
        <div class="col-md-8 ">
          <router-link
            class="btn btn-secondary my-3"
            v-if="singleBootcamp"
            :to="`/bootcamp/${singleBootcamp.slug}`"
            ><i class="fas fa-chevron-left"></i> Bootcamp Info</router-link
          >
          <h3 class="mb-4 text-secondary">{{ singleBootcamp.name }} Reviews</h3>
          <div v-for="bootcamp in getBootcampReviews" :key="bootcamp._id">
            <!-- Reviews -->
            <div class="card mb-3">
              <h5 class="card-header bg-dark text-white">
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
          <h1 class="text-center my-4">
            <span
              class="badge badge-secondary badge-success rounded-circle p-3"
              >{{ singleBootcamp.averageRating.toFixed(1) }}</span
            >
            Rating
          </h1>
          <!-- Buttons -->
          <router-link
            v-if="singleBootcamp"
            class="btn btn-primary btn-block my-3"
            to="/"
            ><i class="fas fa-pencil-alt"></i> Review This Bootcamp</router-link
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
</style>
