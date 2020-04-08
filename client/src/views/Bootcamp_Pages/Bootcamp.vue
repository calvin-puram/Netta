<template>
  <section class="bootcamp mt-5" v-if="Object.keys(singleBootcamp).length > 0">
    <div class="container">
      <div class="row">
        <!-- Main col -->
        <div class="col-md-8">
          <h2 class="text-secondary">{{ singleBootcamp.name }}</h2>

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
              <div class="card-header course_bg text-white">
                {{ course.title }}
              </div>
              <div class="card-body">
                <h5 class="card-title text-secondary">
                  Duration: {{ course.weeks }} Weeks
                </h5>
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
                    <span v-if="course.scholarshipAvailable"
                      ><BaseIcon prop="fas fa-check text-success mr-2"
                    /></span>

                    <span v-else
                      ><BaseIcon prop="fas fa-times text-danger mr-2"
                    /></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- Sidebar -->
        <div class="col-md-4">
          <!-- Image -->
          <img
            :src="`/img/${singleBootcamp.photo}`"
            class="img-thumbnail"
            alt="bootcamp image"
          />
          <!-- Rating -->
          <h3 class="text-center  my-4">
            <v-avatar color="orange" size="62">
              <span class="white--text headline">{{
                singleBootcamp.averageRating.toFixed(1)
              }}</span>
            </v-avatar>
            <span class="text-secondary ml-1">Rating</span>
          </h3>
          <!-- Buttons -->
          <v-btn
            class="my-3"
            block
            color="teal"
            dark
            link
            :to="
              `/bootcamp/${singleBootcamp._id}/${singleBootcamp.slug}/reviews`
            "
          >
            <BaseIcon prop="fas fa-comments mr-1" />
            Read Reviews</v-btn
          >

          <v-btn class="my-3" block color="teal" dark link to="/">
            <BaseIcon prop="fas fa-pencil-alt mr-1" />
            Read Reviews</v-btn
          >

          <v-btn class="my-3" block color="teal" dark link to="/">
            <BaseIcon prop="fas fa-globe mr-1" />
            Visit Website</v-btn
          >

          <!-- Map  -->
          <!-- <div id='map' style='width: 100%; height: 300px;'></div> -->
          <!-- Perks -->
          <v-card class="mx-auto mt-7" max-width="500" tile>
            <v-list disabled>
              <v-list-item-group color="primary">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <span v-if="singleBootcamp.housing"
                        ><BaseIcon prop="fas fa-check text-success mr-3"
                      /></span>

                      <span v-else
                        ><BaseIcon prop="fas fa-times text-danger mr-3"
                      /></span>

                      Housing
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <span v-if="singleBootcamp.jobAssistance"
                        ><BaseIcon prop="fas fa-check text-success mr-3"
                      /></span>

                      <span v-else
                        ><BaseIcon prop="fas fa-times text-danger mr-3"
                      /></span>

                      Job Assistance
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <span v-if="singleBootcamp.jobGuarantee"
                        ><BaseIcon prop="fas fa-check text-success mr-3"
                      /></span>

                      <span v-else
                        ><BaseIcon prop="fas fa-times text-danger mr-3"
                      /></span>

                      Job Guarantee
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <span v-if="singleBootcamp.acceptGi"
                        ><BaseIcon prop="fas fa-check text-success mr-3"
                      /></span>

                      <span v-else
                        ><BaseIcon prop="fas fa-times text-danger mr-3"
                      /></span>
                      Accepts GI Bill
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
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
  }
};
</script>

<style scoped>
.bootcamp {
  margin-top: 7rem !important;
}
.course_bg {
  background: #009688;
}
</style>
