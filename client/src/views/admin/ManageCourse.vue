<template>
  <div>
    <!-- if there is course -->
    <section class="container mt-5" v-if="!loading">
      <div class="row">
        <div class="col-md-8  col-xs-12 mx-auto">
          <div class="card bg-white py-2 px-4">
            <div class="card-body">
              <!-- manage bootcamp button -->
              <v-btn class="my-3" color="teal" dark link to="/manage_bootcamp">
                <BaseIcon prop="fas fa-chevron-left mr-1" />Manage
                Bootcamp</v-btn
              >
              <h3 class="mb-4 text-secondary">Manage Courses</h3>
              <div class="card mb-3">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img
                      :src="`${bootcamp().photo}`"
                      class="card-img mt-2"
                      alt="bootcamp image"
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">
                        <!-- bootcamp name with rating -->
                        <router-link :to="`/bootcamp/${bootcamp().slug}`">
                          <div class="col-md-6 col-sm-12 text-center my-3">
                            <span>{{ bootcamp().name }}</span>

                            <v-rating
                              class="float-right"
                              v-model="bootcamp().averageRating"
                              background-color="purple lighten-3"
                              color="teal"
                              small
                            ></v-rating>
                          </div>
                        </router-link>
                      </h5>
                      <span class="badge badge-dark mb-2 my-3"
                        >{{ bootcamp().location.state }},
                        {{ bootcamp().location.country }}</span
                      >
                      <p class="card-text mt-2">
                        {{ bootcamp().careers.join(', ') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- add bootcamp course button -->
              <BaseNormalBtn
                :route="
                  `/create_bootcamp_courses/${bootcamp().slug}/${
                    bootcamp()._id
                  }`
                "
                >Add Courses</BaseNormalBtn
              >
              <table class="table table-dark table-responsive table-sm">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">CreatedAt</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody v-for="course in bootcamp().courses" :key="course._id">
                  <tr>
                    <td>{{ course.title }}</td>
                    <td>{{ new Date(course.createdAt).toDateString() }}</td>
                    <td>
                      <!-- edit course -->
                      <router-link :to="`/bootcamp/${bootcamp().slug}/`">
                        <v-btn color="teal mr-3 table_actions_1" dark
                          ><BaseIcon prop="fas fa-pencil-alt"
                        /></v-btn>
                      </router-link>
                      <!-- delete course -->
                      <router-link :to="`/bootcamp/${bootcamp().slug}/`">
                        <v-btn color="teal " dark
                          ><BaseIcon prop="fas fa-trash"
                        /></v-btn>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NProgress from 'nprogress';
import store from '@store/index';
import LoadingMixin from '@mixins/LoadingMixins';

export default {
  mixins: [LoadingMixin],
  computed: mapGetters(['getBootcamps', 'getAuthUser']),

  methods: {
    ...mapActions(['getAllBootcamps']),
    bootcamp() {
      return this.getBootcamps.find(doc => doc.user === this.getAuthUser._id);
    }
  },
  created() {
    this.toggleLoading();
    NProgress.start();
    this.getAllBootcamps().then(res => {
      if (res && res.data.success) {
        NProgress.done();
        this.toggleLoading();
      }
    });
  }
};
</script>

<style scoped>
/* mobile phone screen sm <= 425px */
@media screen and (max-width: 425px) {
  .table_actions_1 {
    margin-bottom: 1rem;
  }
}
</style>
