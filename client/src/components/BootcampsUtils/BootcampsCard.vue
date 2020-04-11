<template>
  <v-expansion-panels
    class="mb-3"
    v-if="bootcamp && bootcamp.courses.length > 0"
    focusable
  >
    <v-expansion-panel>
      <v-expansion-panel-header>
        <div class="d-flex justify-content-between align-items-center">
          {{ bootcamp.name }}
          <span class="mr-2" @click="handleDeleteBootcamp"
            ><BaseIcon prop="fas fa-trash"
          /></span>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div class="row no-gutters">
          <div class="col-md-4">
            <img
              :src="`img/${bootcamp.photo}`"
              class="card-img"
              alt="bootcamp image"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
                <router-link v-if="getToken" :to="`bootcamp/${bootcamp.slug}`">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>{{ bootcamp.name }}</span>

                    <v-rating
                      class="float-right"
                      v-model="bootcamp.averageRating"
                      background-color="purple lighten-3"
                      color="teal"
                      small
                    ></v-rating>
                  </div>
                </router-link>

                <router-link v-if="!getToken" to="/login"
                  ><div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>{{ bootcamp.name }}</span>

                    <v-rating
                      class="float-right"
                      v-model="bootcamp.averageRating"
                      background-color="purple lighten-3"
                      color="teal"
                      small
                    ></v-rating>
                  </div>
                </router-link>
              </h5>
              <span class="badge badge-dark mb-2"
                >{{ bootcamp.location.state }},
                {{ bootcamp.location.country }}</span
              >
              <p class="card-text">
                {{ bootcamp.careers.join(', ') }}
              </p>
            </div>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ['bootcamp'],
  computed: mapGetters(['getToken', 'getErr']),
  methods: {
    ...mapActions(['deleteBootcamp']),
    handleDeleteBootcamp() {
      this.deleteBootcamp(this.bootcamp._id).then(res => {
        if (res && res.data.success) {
          this.$noty.success('Bootcamp deleted Successfully!');
          this.$router.push('/manage_bootcamp');
        } else {
          this.$noty.error(this.getErr);
        }
      });
    }
  }
};
</script>
