<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
    <div class="container">
      <a class="navbar-brand" href="index.html"
        ><i class="fas fa-laptop-code"></i> DevCoach</a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="login.html"
              ><i class="fas fa-sign-in-alt"></i> Login</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="register.html"
              ><i class="fas fa-user-plus"></i> Register</a
            >
          </li>
          <li class="nav-item d-none d-sm-block">
            <a class="nav-link" href="#">|</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="bootcamps.html">Browse Bootcamps</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
