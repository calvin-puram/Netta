<template>
  <section class="latest py-5 bg-light">
    <div class="container">
      <h3 class="subtitle-5">Latest Bootcamps</h3>
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
                <v-img height="250" :src="`/img/${bootcamp.photo}`"></v-img>

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
                      class="col-md-6 col-sm-12  mx-auto text-center"
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
</style>
