<template>
  <section class="showcase">
    <div class="container ">
      <div class="row">
        <div class="col-md-6 col-sm-12 ">
          <div
            class="showcase_context d-flex flex-column justify-content-center align-items-center"
          >
            <h1 class="text-secondary heading  ">
              Find a Code Bootcamp
            </h1>
            <p class="lead mb-4">
              Find, rate and read reviews on coding bootcamps
            </p>
            <router-link
              class="btn btn-secondary rounded btn-lg mt-4"
              :to="{ name: 'bootcamps' }"
              >Explore Bootcamps</router-link
            >
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <img src="/img/showcase.jpg" alt="landing image" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.showcase {
  max-height: 100vh;
}
.showcase_context {
  height: 90%;
}
.btn {
  background: #03dfc1 !important;
  border: none !important;
}
img {
  width: 100%;
}

a {
  color: #fff !important;
}
</style>
