<template>
  <form @submit.prevent="getOtherFilter">
    <div class="form-group">
      <label> Rating</label>
      <select class="custom-select mb-2" v-model="ratings">
        <option value="0" selected>Any</option>
        <option value="9">9+</option>
        <option value="8">8+</option>
        <option value="7">7+</option>
        <option value="6">6+</option>
        <option value="5">5+</option>
        <option value="4">4+</option>
        <option value="3">3+</option>
        <option value="2">2+</option>
      </select>
    </div>

    <div class="form-group">
      <label> Budget</label>
      <select class="custom-select mb-2" v-model="budget">
        <option value="1" selected>Any</option>
        <option value="20000">$20,000</option>
        <option value="15000">$15,000</option>
        <option value="10000">$10,000</option>
        <option value="8000">$8,000</option>
        <option value="6000">$6,000</option>
        <option value="4000">$4,000</option>
        <option value="2000">$2,000</option>
      </select>
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
  components: mapGetters(['getErr']),
  data() {
    return {
      ratings: '',
      budget: ''
    };
  },
  methods: {
    ...mapActions(['getBootcampsByFilter']),
    getOtherFilter() {
      const data = {
        rtn: this.ratings * 1,
        bgt: this.budget * 1
      };
      this.getBootcampsByFilter(data).then(res => {
        if (res && res.data.data.length > 0) {
          this.$noty.success('Bootcamps within this Budget & Rating');
        } else if (res.data.data.length === 0) {
          this.$noty.info('No Bootcamp within this rating & budget');
        } else {
          this.$noty.error(this.getErr);
        }
      });
    }
  }
};
</script>
