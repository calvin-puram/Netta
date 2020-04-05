<template>
  <section class="bootcamp mt-5">
    <div class="container">
      <div class="row">
        <!-- Main col -->
        <div class="col-md-8">
          <h1>DevWorks Bootcamp</h1>
          <!-- Description -->
          <p>
            Devworks is a full stack JavaScript Bootcamp located in the heart of
            Boston that focuses on the technologies you need to get a high
            paying job as a web developer
          </p>
          <!-- Avg cost -->
          <p class="lead mb-4">
            Average Course Cost: <span class="text-primary">$10,000</span>
          </p>
          <!-- Courses -->
          <div class="card mb-3">
            <h5 class="card-header bg-primary text-white">
              Front End Web Development
            </h5>
            <div class="card-body">
              <h5 class="card-title">Duration: 8 Weeks</h5>
              <p class="card-text">
                This course will provide you with all of the essentials to
                become a successful frontend web developer. You will learn to
                master HTML, CSS and front end JavaScript, along with tools like
                Git, VSCode and front end frameworks like Vue
              </p>
              <ul class="list-group mb-3">
                <li class="list-group-item">Cost: $8,000 USD</li>
                <li class="list-group-item">Skill Required: Beginner</li>
                <li class="list-group-item">
                  Scholarship Available:
                  <i class="fas fa-check text-success"></i>
                </li>
              </ul>
            </div>
          </div>

          <div class="card mb-3">
            <h5 class="card-header bg-primary text-white">
              Full Stack Web Development
            </h5>
            <div class="card-body">
              <h5 class="card-title">Duration: 12 Weeks</h5>
              <p class="card-text">
                In this course you will learn full stack web development, first
                learning all about the frontend with HTML/CSS/JS/Vue and then
                the backend with Node.js/Express/MongoDB
              </p>
              <ul class="list-group mb-3">
                <li class="list-group-item">Cost: $10,000 USD</li>
                <li class="list-group-item">Skill Required: Intermediate</li>
                <li class="list-group-item">
                  Scholarship Available:
                  <i class="fas fa-times text-danger"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- Sidebar -->
        <div class="col-md-4">
          <!-- Image -->
          <img src="/img/image_1.jpg" class="img-thumbnail" alt="" />
          <!-- Rating -->
          <h1 class="text-center my-4">
            <span class="badge badge-secondary badge-success rounded-circle p-3"
              >8.8</span
            >
            Rating
          </h1>
          <!-- Buttons -->
          <a href="reviews.html" class="btn btn-dark btn-block my-3"
            ><i class="fas fa-comments"></i> Read Reviews</a
          >
          <a href="add-review.html" class="btn btn-light btn-block my-3"
            ><i class="fas fa-pencil-alt"></i> Write a Review</a
          >
          <a href="#" target="_blank" class="btn btn-secondary btn-block my-3"
            ><i class="fas fa-globe"></i> Visit Website</a
          >
          <!-- Map  -->
          <!-- <div id='map' style='width: 100%; height: 300px;'></div> -->
          <!-- Perks -->
          <ul class="list-group list-group-flush mt-4">
            <li class="list-group-item">
              <i class="fas fa-check text-success"></i> Housing
            </li>

            <li class="list-group-item">
              <i class="fas fa-check text-danger"></i> Job Assistance
            </li>

            <li class="list-group-item">
              <i class="fas fa-times text-success"></i> Job Guarantee
            </li>

            <li class="list-group-item">
              <i class="fas fa-check text-success"></i> Accepts GI Bill
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bootcamp {
  margin-top: 7rem !important;
}
</style>
