<template>
  <div>
    <section class="container mt-5" v-if="bootcamp()">
      <div class="row">
        <div class="col-md-8 m-auto">
          <div class="card bg-white py-2 px-4">
            <div class="card-body">
              <h1 class="mb-4 text-secondary">Manage Bootcamp</h1>
              <div class="card mb-3">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img
                      :src="`/img/${bootcamp().photo}`"
                      class="card-img"
                      alt="botcamp image"
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">
                        <router-link
                          :to="`/bootcamp/${bootcamp().slug}`"
                          v-if="
                            bootcamp().courses && bootcamp().courses.length > 0
                          "
                        >
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
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

                        <!-- if no bootcamp courses -->
                        <router-link
                          :to="
                            `/create_bootcamp_courses/${bootcamp().slug}/${
                              bootcamp()._id
                            }`
                          "
                          v-else
                        >
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
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
                      <span class="badge badge-dark mb-2"
                        >{{ bootcamp().location.state }},
                        {{ bootcamp().location.country }}</span
                      >
                      <p class="card-text">
                        {{ bootcamp().careers.join(', ') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <form class="mb-4">
                <div class="form-group">
                  <div class="custom-file">
                    <input
                      type="file"
                      name="photo"
                      class="custom-file-input"
                      id="photo"
                    />
                    <label class="custom-file-label" for="photo"
                      >Add Bootcamp Image</label
                    >
                  </div>
                </div>
                <input
                  type="submit"
                  class="btn btn-light btn-block"
                  value="Upload Image"
                />
              </form>
              <BaseNormalBtn route="/">Edit Bootcamp Details</BaseNormalBtn>

              <BaseNormalBtn
                :route="
                  `/create_bootcamp_courses/${bootcamp().slug}/${
                    bootcamp()._id
                  }`
                "
                >Add Courses</BaseNormalBtn
              >

              <BaseNormalBtn route="/">Remove Bootcamp</BaseNormalBtn>

              <p class="text-danger mt-5">
                * You must add courses that your Bootcamp offers before the
                bootcamp will be display on this platform.
              </p>
              <p class="text-muted mt-5">
                * You can only add one bootcamp per account.
              </p>
              <p class="text-muted">
                * You must be affiliated with the bootcamp in some way in order
                to add it to DevCamper.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ADMIN OR PUBLISHER HAVE NO BOOTCAMP -->
    <section
      class="container mt-5"
      v-if="bootcamp() && Object.keys(bootcamp()).length === 0"
    >
      <div class="row">
        <div class="col-md-8 m-auto">
          <div class="card bg-white py-2 px-4">
            <div class="card-body">
              <h1 class="mb-2 text-secondary">Manage Bootcamp</h1>
              <p class="lead">
                You have not yet added a bootcamp
              </p>
              <BaseNormalBtn route="/create_bootcamp"
                >Add Bootcamp</BaseNormalBtn
              >
              <p class="text-danger mt-5">
                * You must add courses that your Bootcamp offers before the
                bootcamp will be display on this platform.
              </p>
              <p class="text-muted mt-5">
                * You can only add one bootcamp per account.
              </p>
              <p class="text-muted">
                * You must be affiliated with the bootcamp in some way in order
                to add it to DevCamper.
              </p>
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

export default {
  computed: mapGetters(['getBootcamps', 'getAuthUser']),
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    store.dispatch('getAllBootcamps').then(res => {
      store.dispatch('authUser').then(res => {
        if (res && res.data.success) {
          NProgress.done();
        }
      });
    });
    next();
  },
  methods: {
    bootcamp() {
      return this.getBootcamps.find(doc => doc.user === this.getAuthUser._id);
    }
  }
};
</script>
