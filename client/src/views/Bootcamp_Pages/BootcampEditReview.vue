<template>
  <section class="container mt-5">
    <div class="row">
      <div class="col-md-8 m-auto">
        <div class="card bg-white py-2 px-4" v-if="getSingleReview">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <v-btn
                class="my-3"
                color="teal"
                dark
                link
                :to="`/bootcamp/${getSingleReview.bootcamp.slug}`"
              >
                <BaseIcon prop="fas fa-chevron-left mr-1" />Bootcamp Info</v-btn
              >

              <h4 class=" mb-4 text-secondary">Edit Review</h4>
            </div>

            <form @submit.prevent="handleEditReview">
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
import { mapActions, mapGetters } from 'vuex';
import LoadingMixin from '@mixins/LoadingMixins';
import NProgress from 'nprogress';

export default {
  computed: mapGetters(['getSingleReview', 'getErr']),
  mixins: [LoadingMixin],
  data() {
    return {
      dialog: false,
      review: '',
      rating: '',
      text: ''
    };
  },
  methods: {
    ...mapActions(['editReview', 'singleReview']),
    handleEditReview() {
      this.toggleLoading();
      const data = {
        title: this.text,
        rating: this.rating,
        text: this.review,
        id: this.$route.params.id,
        bootcamp: this.getSingleReview.bootcamp._id
      };

      this.editReview(data).then(res => {
        this.toggleLoading();
        if (res && res.data.success) {
          this.$noty.success('Review updated Successfully!');
          this.$router.push(`/bootcamp/${this.$route.params.slug}`);
        } else {
          this.$noty.error(this.getErr);
        }
      });
    }
  },

  created() {
    NProgress.start();
    this.singleReview(this.$route.params.id).then(res => {
      if (res && res.data.success) {
        this.review = this.getSingleReview.text;
        this.rating = this.getSingleReview.rating;
        this.text = this.getSingleReview.title;
        NProgress.done();
      }
    });
  }
};
</script>
