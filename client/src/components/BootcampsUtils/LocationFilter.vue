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
    findBootcamp() {
      const data = {
        lng: this.lng * 1,
        lat: this.lat * 1
      };

      this.getBootcampsByRadius(data);
    }
  }
};
</script>
