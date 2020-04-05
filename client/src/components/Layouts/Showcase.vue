<template>
  <section class="showcase">
    <div class="dark-overlay">
      <div class="showcase-inner container">
        <h1 class="display-4">Find a Code Bootcamp</h1>
        <p class="lead">
          Find, rate and read reviews on coding bootcamps
        </p>
        <form @submit.prevent="getBootcamp">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="lng"
                  placeholder="Enter Longitude"
                  required
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="lat"
                  placeholder="Enter Latitude"
                />
              </div>
            </div>
          </div>
          <button
            :disabled="loading"
            type="submit"
            class="btn btn-primary btn-block"
          >
            Find Bootcamps
            <i class="fas fa-spin fa-spinner ml-2" v-if="loading"></i>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  computed: mapGetters(['getErr']),
  data() {
    return {
      lng: '',
      lat: '',
      loading: false
    };
  },
  methods: {
    ...mapActions(['getBootcampsByRadius']),
    getBootcamp() {
      this.loading = true;
      const data = {
        lng: this.lng * 1,
        lat: this.lat * 1
      };

      this.getBootcampsByRadius(data).then(res => {
        this.loading = false;
        if (res && res.data.success) {
          this.$router.push({ name: 'bootcamps-within' });
        } else {
          this.$noty.error(this.getErr);
        }
      });
    }
  }
};
</script>
