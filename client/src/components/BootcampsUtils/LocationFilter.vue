<template>
  <form @submit.prevent="findBootcamp">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            name="miles"
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
            name="zipcode"
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
    />
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: mapGetters(['getErr']),
  data() {
    return {
      lng: '',
      lat: ''
    };
  },
  methods: {
    ...mapActions(['getBootcampsByRadius']),
    findBootcamp() {
      const data = {
        lng: this.lng * 1,
        lat: this.lat * 1
      };

      this.getBootcampsByRadius(data).then(res => {
        if (res && res.data.success) {
          this.$noty.success('Bootcamps within this radius');
        } else {
          this.$noty.error(this.getErr);
        }
      });
    }
  }
};
</script>
