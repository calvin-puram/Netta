<template>
  <section class="showcase">
    <div class="dark-overlay">
      <div class="showcase-inner container">
        <h1 class="display-4">Find a Code Bootcamp</h1>
        <p class="lead">
          Find, rate and read reviews on coding bootcamps
        </p>
        <form>
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
          <input
            type="submit"
            value="Find Bootcamps"
            class="btn btn-primary btn-block"
            @click="getBootcamp"
          />
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      lng: '',
      lat: ''
    };
  },
  methods: {
    ...mapActions(['getBootcampsByRadius']),
    getBootcamp() {
      const data = {
        lng: this.lng * 1,
        lat: this.lat * 1
      };

      this.getBootcampsByRadius(data).the(res => {
        if (res && res.data.success) {
          this.router.push('/bootcamps');
        }
      });
    }
  }
};
</script>
