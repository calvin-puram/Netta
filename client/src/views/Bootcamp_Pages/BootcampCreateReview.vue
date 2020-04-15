<template>
  <section class="container mt-5">
    <div class="row">
      <div class="col-md-8 m-auto">
        <div class="card bg-white py-2 px-4">
          <div class="card-body">
            <div class="col-md-6 col-sm-12">
              <v-btn
                class="my-3"
                color="teal"
                dark
                link
                :to="`/bootcamp/${singleBootcamp.slug}`"
              >
                <BaseIcon prop="fas fa-chevron-left mr-1" />Bootcamp Info</v-btn
              >

              <h3 class="mb-2 text-secondary">{{ singleBootcamp.name }}</h3>
            </div>

            <h4 class=" mb-4 text-secondary">Write a Review</h4>
            <p>
              You must have attended and graduated this bootcamp to review
            </p>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="rating"
                  >Rating: <span class="text-primary">{{ rating }}</span></label
                >
                <input
                  type="range"
                  class="custom-range"
                  v-model="rating"
                  min="1"
                  max="5"
                  step="0.5"
                  id="rating"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  name="title"
                  required
                  class="form-control"
                  v-model="text"
                  placeholder="Review title"
                />
              </div>
              <div class="form-group">
                <textarea
                  name="review"
                  rows="10"
                  required
                  class="form-control"
                  v-model="review"
                  placeholder="Your review"
                ></textarea>
              </div>
              <div class="form-group">
                <BaseButton name="Submit Review" :loading="loading" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import store from '@store/index';
import NProgress from 'nprogress';
import LoadingMixin from '@mixins/LoadingMixins';

export default {
  mixins: [LoadingMixin],
  computed: mapGetters(['singleBootcamp', 'getErr']),
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    store.dispatch('SingleBootcamps', to.params.slug).then(res => {
      if (res && res.data.success) {
        NProgress.done();
      }
    });
    next();
  },

  data() {
    return {
      rating: '0',
      text: '',
      review: ''
    };
  },
  methods: {
    ...mapActions(['createReviews']),
    handleSubmit() {
      this.toggleLoading();
      const data = {
        rating: this.rating * 1,
        title: this.text,
        text: this.review,
        bootcamp: this.$route.params.id
      };
      this.createReviews(data).then(res => {
        this.toggleLoading();
        if (res && res.data.success) {
          this.$noty.success('Review created Successfully!');
          this.$router.push(
            `/bootcamp/${this.$route.params.id}/${this.$route.params.slug}/reviews`
          );
        } else {
          this.$noty.error(this.getErr);
        }
      });
    }
  }
};
</script>

<style>
/* mobile phone screen sm <= 425px */
@media screen and (max-width: 425px) {
  .bootcamps {
    margin-top: 3rem;
  }
  h3.text-secondary,
  h4.text-secondary {
    font-size: 20px;
    margin-top: 1rem;
  }
}
</style>
