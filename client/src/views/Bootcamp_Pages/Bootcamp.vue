<template>
  <section class="bootcamp mt-5">
    <div class="container">
      <div class="row">
        <!-- Main col -->
        <div class="col-md-8">
          <h1>{{ singleBootcamp.name }}</h1>
          <!-- Description -->
          <p>
            {{ singleBootcamp.description }}
          </p>
          <!-- Avg cost -->
          <p class="lead mb-4">
            Average Course Cost:
            <span class="text-primary">${{ singleBootcamp.averageCost }}</span>
          </p>
          <!-- Courses -->
          <div v-for="course in singleBootcamp.courses" :key="course._id">
            <div class="card mb-3">
              <h5 class="card-header bg-primary text-white">
                {{ course.title }}
              </h5>
              <div class="card-body">
                <h5 class="card-title">Duration: {{ course.weeks }} Weeks</h5>
                <p class="card-text">
                  {{ course.description }}
                </p>
                <ul class="list-group mb-3">
                  <li class="list-group-item">
                    Cost: ${{ course.tuition }} USD
                  </li>
                  <li class="list-group-item">
                    Skill Required: {{ course.minimumSkill }}
                  </li>
                  <li class="list-group-item">
                    Scholarship Available:
                    <i
                      class="fas fa-check text-success"
                      v-if="course.scholarshipAvailable"
                    ></i>
                    <i class="fas fa-times text-danger" v-else>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- Sidebar -->
        <div class="col-md-4">
          <!-- Image -->
          <img :src="`/img/${singleBootcamp.photo}`" class="img-thumbnail" alt="bootcamp image" />
          <!-- Rating -->
          <h1 class="text-center my-4">
            <span class="badge badge-secondary badge-success rounded-circle p-3"
             v-if="singleBootcamp.averageRating" >{{ singleBootcamp.averageRating.toFixed(1) }}</span
            >
            <span class="badge badge-secondary badge-success rounded-circle p-3"
             v-else >5.6</span
            >
            Rating
          </h1>
          <!-- Buttons -->
          <a href="reviews.html" class="btn btn-dark btn-block my-3"
            ><i class="fas fa-comments"></i> Read Reviews</a
          >
          <a href="add-review.html" class="btn btn-light btn-block my-3"
            ><i class="fas fa-pencil-alt"></i> Write a Review</a
          >
          <a href="#" target="_blank" class="btn btn-secondary btn-block my-3"
            ><i class="fas fa-globe"></i> Visit Website</a
          >
          <!-- Map  -->
          <!-- <div id='map' style='width: 100%; height: 300px;'></div> -->
          <!-- Perks -->
          <ul class="list-group list-group-flush mt-4">
            <li class="list-group-item">
              <i class="fas fa-check text-success" v-if="singleBootcamp.housing"></i> 
              <i class="fas fa-times text-danger" v-else></i>
              Housing
              
            </li>

            <li class="list-group-item">
              <i class="fas fa-check text-success" v-if="singleBootcamp.jobAssistance"></i>
              <i class="fas fa-times text-danger" v-else></i>
               Job Assistance
            </li>

            <li class="list-group-item">
              <i class="fas fa-times text-success" v-if="singleBootcamp.jobGuarantee"></i>
              <i class="fas fa-times text-danger" v-else></i>
               Job Guarantee
            </li>

            <li class="list-group-item">
              <i class="fas fa-check text-success" v-if="singleBootcamp.acceptGi"></i> 
              <i class="fas fa-times text-danger" v-else></i>
              Accepts GI Bill
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NProgress from 'nprogress';
import store from '@store/index';

export default {
  computed: mapGetters(['singleBootcamp']),
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    store.dispatch('SingleBootcamps', to.params.slug).then(res => {
      if (res && res.data.success) {
        NProgress.done();
      }
    });
    next();
  },
  methods: {
    ...mapActions(['SingleBootcamps'])
  }
};
</script>

<style scoped>
.bootcamp {
  margin-top: 7rem !important;
}
</style>
