<template>
  <section class="latest py-5 bg-light">
    <div class="container">
      <div class="row">
        <h3>Latest Bootcamps</h3>
        <div class="card-group">
          <div
            class="col-md-4 col-sm-12"
            v-for="bootcamp in getLatestBootcamps"
            :key="bootcamp._id"
          >
            <div>
              <div class="card m-2">
                <img
                  :src="`img/${bootcamp.photo}`"
                  class="card-img-top"
                  alt="bootcamp image"
                />
                <div class="card-body">
                  <h5 class="card-title">
                    <router-link to="/"
                      >{{ bootcamp.name }}
                      <span
                        class="float-right badge badge-success"
                        v-if="bootcamp.averageRating"
                        >{{ bootcamp.averageRating.toFixed(1) }}</span
                      >
                      <span class="float-right badge badge-success" v-else
                        >6.2</span
                      >
                    </router-link>
                  </h5>
                  <span class="badge badge-dark mb-2"
                    >{{ bootcamp.location.state }},
                    {{ bootcamp.location.country }}</span
                  >
                  <p class="card-text">
                    {{ bootcamp.description }}
                  </p>
                  <p class="card-text">
                    <small class="text-muted">{{
                      bootcamp.careers.join(', ')
                    }}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['getLatestBootcamps']
};
</script>

<style scoped>
.card {
  height: 32rem !important;
}
</style>
