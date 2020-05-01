<template>
  <section class="latest py-5 bg-light" v-if="getLatestBootcamps.length > 0">
    <div class="container">
      <h3 class="subtitle-5 heading_lastest">
        Latest Bootcamps
      </h3>
      <div class="row">
        <div
          class="col-md-4 col-sm-12"
          v-for="bootcamp in getLatestBootcamps"
          :key="bootcamp._id"
        >
          <div>
            <!-- vuetity card -->
            <template>
              <v-card
                max-width="374"
                class="card"
                dense
                v-if="bootcamp.courses.length > 0"
              >
                <v-img
                  v-if="bootcamp.photo === 'no-photo.jpg'"
                  height="250"
                  :src="`/img/${bootcamp.photo}`"
                ></v-img>
                <v-img v-else height="250" :src="`${bootcamp.photo}`"></v-img>

                <v-card-title>
                  <router-link v-if="getToken" :to="`bootcamp/${bootcamp.slug}`"
                    >{{ bootcamp.name }}
                  </router-link>

                  <router-link v-if="!getToken" to="/login"
                    >{{ bootcamp.name }}
                  </router-link>
                </v-card-title>

                <v-card-text>
                  <v-row align="center" class="mx-0">
                    <v-rating
                      :value="bootcamp.averageRating"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="14"
                    ></v-rating>

                    <div class="grey--text ml-4">
                      {{ bootcamp.averageRating }} ({{
                        bootcamp.ratingsQuantity ? bootcamp.ratingsQuantity : 0
                      }})
                    </div>
                  </v-row>

                  <div class="my-4 subtitle-1">
                    <BaseIcon prop="fas fa-map-marker-alt mr-1" />
                    {{ bootcamp.location.state }},
                    {{ bootcamp.location.country }}
                  </div>

                  <div>{{ bootcamp.description }}</div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>
                <div class="container">
                  <div class="row">
                    <div
                      class="   mx-auto text-center"
                      v-for="career in bootcamp.careers"
                      :key="career"
                    >
                      <v-btn text small color="teal">{{ career }}</v-btn>
                    </div>
                  </div>
                </div>
              </v-card>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['getLatestBootcamps'],
  computed: mapGetters(['getToken'])
};
</script>

<style scoped>
.card {
  height: 40rem !important;
}

/* large screen lg <= 1024px */
@media screen and (max-width: 1024px) {
  .card {
    height: 45rem !important;

    margin: auto;
  }
}

/* tablet screen xs <= 768px */
@media screen and (max-width: 768px) {
  .heading_lastest {
    font-style: oblique;
    font-size: 30px;
    text-align: center;
  }

  .card {
    height: 45rem !important;
    display: block;
    margin: auto;
  }
}
/* mobile phone screen sm <= 425px */
@media screen and (max-width: 425px) {
  .heading_lastest {
    font-style: oblique;
    font-size: 20px;
    text-align: center;
  }

  .card {
    height: 40rem !important;
  }
}
</style>
