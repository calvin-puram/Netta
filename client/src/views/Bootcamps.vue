<template>
  <section class="browse my-5">
    <div class="container">
      <div class="row">
        <!-- Sidebar -->
        <div class="col-md-4">
          <div class="card card-body mb-4">
            <h4 class="mb-3">By Location</h4>
            <LocationFilter />
          </div>

          <h4>Filter</h4>
          <OtherFilter />
        </div>
        <!-- Main col -->
        <div class="col-md-8">
          <!-- Bootcamps -->
          <BootcampCard />
          <BootcampCard />
          <BootcampCard />
          <BootcampCard />

          <!-- Pagination -->
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#">Previous</a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LocationFilter from '../components/BootcampsUtils/LocationFilter';
import OtherFilter from '../components/BootcampsUtils/OtherFilters';
import BootcampCard from '../components/BootcampsUtils/BootcampsCard';

export default {
  components: {
    LocationFilter,
    OtherFilter,
    BootcampCard
  }
};
</script>

<style scoped>
.browse {
  margin-top: 7rem !important;
}
</style>
