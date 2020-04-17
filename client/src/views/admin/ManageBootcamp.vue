<template>
  <div>
    <section class="container mt-5" v-if="!loading && bootcamp()">
      <div class="row">
        <div class="col-md-8 m-auto">
          <div class="card bg-white py-2 px-4">
            <div class="card-body">
              <h1 class="mb-4 text-secondary">Manage Bootcamp</h1>
              <div class="card mb-3">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <!-- if default photo -->
                    <img
                      v-if="bootcamp().photo === 'no-photo.jpg'"
                      :src="`img/${bootcamp().photo}`"
                      class="card-img"
                      alt="botcamp image"
                    />
                    <!-- photo from cloudinary -->
                    <img
                      v-else
                      height="200px"
                      :src="
                        `${getPhoto.length > 0 ? getPhoto : bootcamp().photo}`
                      "
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
                          <div class="col-md-6 col-sm-12 text-center">
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
                          <div class="col-md-6 col-sm-12 text-center">
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
              <!-- upload bootcamp photo -->
              <v-form
                class="mb-4 mt-3"
                ref="form"
                v-model="valid"
                enctype="multipart/form-data"
                @submit.prevent="uploadFile(bootcamp()._id)"
              >
                <div class="form-group">
                  <v-file-input
                    value=""
                    :rules="rules"
                    required
                    label="Upload Bootcamp Photo"
                    show-size
                    v-model="file"
                  ></v-file-input>
                </div>
                <BaseButton name="Upload Image" :loading="getLoading" />
              </v-form>
              <!-- edit bootcamp details -->
              <BaseNormalBtn
                v-if="bootcamp().courses.length > 0"
                :route="`/bootcamp/${bootcamp().slug}`"
                >Edit Bootcamp Details</BaseNormalBtn
              >

              <!-- add bootcamp courses -->
              <BaseNormalBtn
                :route="
                  `/create_bootcamp_courses/${bootcamp().slug}/${
                    bootcamp()._id
                  }`
                "
                >Add Courses</BaseNormalBtn
              >

              <!-- manage courses -->
              <div v-if="bootcamp().courses.length > 0">
                <BaseNormalBtn
                  :route="
                    `/bootcamp/${bootcamp()._id}/${
                      bootcamp().slug
                    }/manage_courses`
                  "
                  >Manage Courses</BaseNormalBtn
                >
              </div>
              <!-- remove bootcamp -->
              <div>
                <BaseNormalBtn
                  v-if="bootcamp().courses.length > 0"
                  route="/bootcamps"
                  >Remove Bootcamp</BaseNormalBtn
                >
              </div>

              <p class="text-danger mt-5">
                * You must add courses that your Bootcamp offers before the
                bootcamp will be display on this platform.
              </p>
              <p class="text-muted mt-5">
                * You can only add one bootcamp per account.
              </p>
              <p class="text-muted">
                * You must be affiliated with the bootcamp in some way in order
                to add it to DevCoach.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ADMIN OR PUBLISHER HAVE NO BOOTCAMP -->
    <section class="container mt-5" v-if="!loading && !bootcamp()">
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
import LoadingMixin from '@mixins/LoadingMixins';

export default {
  mixins: [LoadingMixin],
  computed: mapGetters([
    'getBootcamps',
    'getAuthUser',
    'getErr',
    'getLoading',
    'getPhoto'
  ]),
  data() {
    return {
      file: null,
      valid: true,
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          'photo size should be less than 2 MB!'
      ]
    };
  },
  methods: {
    ...mapActions(['getAllBootcamps', 'uploadedimage']),
    bootcamp() {
      const data = this.getBootcamps.find(
        doc => doc.user === this.getAuthUser._id
      );

      return data;
    },

    uploadFile(id) {
      if (this.$refs.form.validate()) {
        this.snackbar = true;

        let formData = new FormData();

        formData.append('file', this.file);
        this.uploadedimage({ formData, id }).then(res => {
          if (res && res.data.success) {
            this.$router.push('/bootcamps');
            this.$noty.success('bootcamp image uploaded successfully!');
            this.file = null;
          } else {
            this.$noty.error(this.getErr);
          }
        });
      }
    }
  },
  created() {
    this.toggleLoading();
    NProgress.start();
    this.getAllBootcamps().then(res => {
      if (res && res.data.success) {
        this.toggleLoading();
        NProgress.done();
      }
    });
  }
};
</script>

<style scoped>
/* mobile phone screen sm <= 425px */
@media screen and (max-width: 425px) {
  h1.text-secondary {
    font-size: 20px;
  }
}
</style>
