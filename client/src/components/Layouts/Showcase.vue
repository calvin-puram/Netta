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
          <BaseButton :loading="loading" name="Find Bootcamps" />
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoadingMixin from '@mixins/LoadingMixins';
export default {
  computed: mapGetters(['getErr']),
  mixins: [LoadingMixin],
  data() {
    return {
      lng: '',
      lat: ''
    };
  },
  methods: {
    ...mapActions(['getBootcampsByRadius']),
    getBootcamp() {
      this.toggleLoading();
      const data = {
        lng: this.lng * 1,
        lat: this.lat * 1
      };

      this.getBootcampsByRadius(data).then(res => {
        this.toggleLoading();
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
