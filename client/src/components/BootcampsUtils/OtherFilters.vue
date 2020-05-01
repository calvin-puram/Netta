<template>
  <form @submit.prevent="getOtherFilter">
    <div class="form-group">
      <label> Rating</label>
      <select
        class="custom-select mb-2"
        v-model="ratings"
        @change="checkSelect"
      >
        <option value="">Please Select One</option>

        <option value="5">5+</option>
        <option value="4">4+</option>
        <option value="3">3+</option>
        <option value="2">2+</option>
      </select>
    </div>

    <div class="form-group">
      <label> Budget</label>
      <select class="custom-select mb-2" v-model="budget" @change="checkSelect">
        <option value="">Please Select One</option>
        <option value="20000">$20,000</option>
        <option value="8000">$8,000</option>
        <option value="5000">$5,000</option>
        <option value="2000">$2,000</option>
        <option value="1000">$1,000</option>
        <option value="500">$500</option>
        <option value="100">$100</option>
      </select>
    </div>

    <button type="submit" :disabled="disabled" class="btn text-light btn-block">
      Find Bootcamps
    </button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FormFilterMixin from '@mixins/FormFiltersMixin';

export default {
  computed: mapGetters(['getErr']),
  mixins: [FormFilterMixin],
  data() {
    return {
      ratings: '',
      budget: '',
      disabled: true
    };
  },
  methods: {
    ...mapActions(['getBootcampsByFilter']),
    checkSelect() {
      if (
        Object.values(this.ratings).length > 0 &&
        Object.values(this.budget).length > 0
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    getOtherFilter() {
      const data = {
        rtn: this.ratings * 1,
        bgt: this.budget * 1
      };
      this.getBootcampsByFilter(data).then(res => {
        this.setBootcamps(
          res,
          'Bootcamps within this Budget & Rating',
          this.getErr,
          'No Bootcamp within this rating & budget'
        );
      });
    }
  }
};
</script>

<style scoped>
.btn {
  background-color: #009688 !important;
}
</style>
