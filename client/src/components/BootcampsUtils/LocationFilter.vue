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
    <BaseButton :loading="loading" name="Find Bootcamps" />
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FormFilterMixin from '@mixins/FormFiltersMixin';
import LoadingMixin from '@mixins/LoadingMixins';

export default {
  computed: mapGetters(['getErr']),
  mixins: [FormFilterMixin, LoadingMixin],
  data() {
    return {
      lng: '',
      lat: ''
    };
  },
  methods: {
    ...mapActions(['getBootcampsByRadius']),
    findBootcamp() {
      this.toggleLoading();
      const data = {
        lng: this.lng * 1,
        lat: this.lat * 1
      };

      this.getBootcampsByRadius(data).then(res => {
        this.toggleLoading();
        this.setBootcamps(res, 'Bootcamps within this radius', this.getErr);
      });
    }
  }
};
</script>
