<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
    <div class="container">
      <router-link class="navbar-brand" to="/"
        ><i class="fas fa-laptop-code"></i> DevCoach</router-link
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
          <li class="nav-item" v-if="!getToken">
            <router-link class="nav-link" to="/login"
              ><i class="fas fa-sign-in-alt"></i> Login</router-link
            >
          </li>
          <li class="nav-item" v-if="!getToken">
            <router-link class="nav-link" to="/register"
              ><i class="fas fa-user-plus"></i> Register</router-link
            >
          </li>

          <li class="nav-item dropdown" v-if="getToken">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
            >
              <i class="fas fa-user"></i> Account
            </a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="manage-bootcamp.html"
                >Manage Bootcamp</a
              >
              <a class="dropdown-item" href="manage-reviews.html"
                >Manage Reviews</a
              >
              <a class="dropdown-item" href="manage-account.html"
                >Manage Account</a
              >
              <div class="dropdown-divider"></div>
              <a @click.prevent="logoutUser" class="dropdown-item" href="#"
                ><i class="fas fa-sign-out-alt"></i> Logout</a
              >
            </div>
          </li>

          <li class="nav-item d-none d-sm-block">
            <a class="nav-link" href="#">|</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'bootcamps' }"
              >Browse Bootcamps</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import router from '../../router/index';

export default {
  computed: mapGetters(['getToken']),
  methods: {
    ...mapActions(['logout']),
    logoutUser() {
      this.logout();
      router.push('/');
    }
  }
};
</script>
