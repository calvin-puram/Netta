<template>
  <div class="card mb-3" v-if="bootcamp">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img
          :src="`img/${bootcamp.photo}`"
          class="card-img"
          alt="bootcamp image"
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            <router-link :to="`bootcamp/${bootcamp.slug}`"
              >{{ bootcamp.name
              }}<span
                class="float-right badge badge-success"
                v-if="bootcamp.averageRating"
                >{{ bootcamp.averageRating.toFixed(1) }}</span
              >
              <span class="float-right badge badge-success" v-else>7.5</span>
            </router-link>
          </h5>
          <span class="badge badge-dark mb-2"
            >{{ bootcamp.location.state }},
            {{ bootcamp.location.country }}</span
          >
          <p class="card-text">
            {{ bootcamp.careers.join(', ') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['bootcamp']
};
</script>
