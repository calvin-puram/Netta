<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped color="teal" class="navigator">
      <v-list dense>
        <!-- logo -->
        <v-list-item class="d-md-none  d-xs-flex justify-center align-center">
          <v-toolbar-title>
            <router-link to="/">
              <BaseIcon prop="fas fa-laptop-code fa-logo mr-1" />
              <span class="logo">DevCoach</span></router-link
            >
          </v-toolbar-title>
        </v-list-item>
        <v-divider class="d-md-none  d-xs-flex"></v-divider>
        <!-- login -->
        <v-list-item link v-if="!getToken" to="/login" class="mb-3">
          <v-list-item-title>
            <span class=" side_nav_color subtitle-1 font-italic"
              ><BaseIcon prop="fas fa-sign-in-alt mr-2 " />Login</span
            ></v-list-item-title
          >
        </v-list-item>
        <!-- register -->
        <v-list-item link v-if="!getToken" to="/register" class="mb-3">
          <v-list-item-title>
            <span class=" side_nav_color subtitle-1 font-italic"
              ><BaseIcon prop="fas fa-user-plus mr-2 " />Register</span
            ></v-list-item-title
          >
        </v-list-item>

        <!-- bootcamps -->
        <v-divider v-if="!getToken"></v-divider>
        <v-list-item link to="/bootcamps" v-if="!getToken">
          <v-list-item-title>
            <span class=" side_nav_color subtitle-1 font-italic"
              ><BaseIcon prop="fas fa-columns mr-2" />Browse Bootcamps</span
            >
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <!-- if logged in -->
      <v-list v-if="getToken">
        <!-- manage bootcamp -->
        <v-list-item
          link
          to="/manage_bootcamp"
          v-if="
            getAuthUser.role === 'admin' || getAuthUser.role === 'publisher'
          "
        >
          <v-list-item-title>
            <span class=" side_nav_color subtitle-1 font-italic"
              ><BaseIcon prop="far fa-clipboard mr-2" />Manage Bootcamp</span
            ></v-list-item-title
          >
        </v-list-item>
        <!-- manage reviews -->
        <v-list-item
          link
          to="/manage_reviews"
          v-if="getAuthUser.role === 'admin'"
        >
          <v-list-item-title>
            <span class=" side_nav_color subtitle-1 font-italic"
              ><BaseIcon prop="fas fa-users mr-2" /> Manage Reviews</span
            ></v-list-item-title
          >
        </v-list-item>
        <!-- profile -->
        <v-list-item link to="/profile">
          <v-list-item-title>
            <span class=" side_nav_color subtitle-1 font-italic"
              ><BaseIcon prop="fas fa-user mr-2" /> Manage Account</span
            ></v-list-item-title
          >
        </v-list-item>

        <!-- logout -->
        <v-list-item link @click="logoutUser">
          <v-list-item-title>
            <span class=" side_nav_color subtitle-1 font-italic"
              ><BaseIcon prop="fas fa-sign-out-alt mr-2" /> Logout</span
            ></v-list-item-title
          >
        </v-list-item>
        <!-- bootcamps -->
        <v-divider></v-divider>
        <v-list-item link to="/bootcamps">
          <v-list-item-title>
            <span class=" side_nav_color subtitle-1 font-italic"
              ><BaseIcon prop="fas fa-columns mr-2" />Browse Bootcamps</span
            >
          </v-list-item-title>
        </v-list-item>
      </v-list>

      <div class="app_footer">
        <v-divider></v-divider>
        <v-card-title class="teal" dark>
          <h6 class="text-center">
            Get connected with us
          </h6>

          <v-spacer></v-spacer>

          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-title>
      </div>
    </v-navigation-drawer>

    <v-app-bar app clipped-left flat color="teal">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="d-none d-sm-flex">
        <router-link to="/">
          <BaseIcon prop="fas fa-laptop-code fa-logo mr-1" />
          <span class="logo">DevCoach</span></router-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
        class="d-none d-sm-flex"
        text
        large
        color="white"
        link
        to="/login"
        v-if="!getToken"
      >
        <BaseIcon prop="fas fa-sign-in-alt mr-1" />
        Login</v-btn
      >
      <v-divider
        class="mx-4 d-none d-sm-flex"
        inset
        vertical
        v-if="!getToken"
      ></v-divider>
      <v-btn
        class="d-none d-sm-flex"
        text
        large
        color="white"
        link
        to="/register"
        v-if="!getToken"
      >
        <BaseIcon prop="fas fa-user-plus mr-1" />
        Register</v-btn
      >
      <!-- login -->

      <v-divider
        class="mx-4 d-none d-sm-flex"
        inset
        vertical
        v-if="getToken"
      ></v-divider>
      <template v-if="getToken">
        <div class="text-center">
          <v-menu open-on-hover bottom offset-y>
            <template v-slot:activator="{ on }">
              <v-btn dark v-on="on" text>
                Account<BaseIcon prop="fas fa-chevron-down ml-2" />
              </v-btn>
            </template>
            <v-list dense color="teal" dark flat>
              <v-list-item
                link
                to="/manage_bootcamp"
                v-if="
                  getAuthUser.role === 'admin' ||
                    getAuthUser.role === 'publisher'
                "
              >
                <v-list-item-title>
                  <BaseIcon prop="far fa-clipboard mr-2" />
                  Manage Bootcamp</v-list-item-title
                >
              </v-list-item>

              <v-list-item
                link
                to="/manage_reviews"
                v-if="getAuthUser.role === 'admin'"
              >
                <v-list-item-title>
                  <BaseIcon prop="fas fa-users mr-2" />
                  Manage Reviews</v-list-item-title
                >
              </v-list-item>

              <v-list-item link to="/profile">
                <v-list-item-title>
                  <BaseIcon prop="fas fa-user mr-2" />
                  Manage Account</v-list-item-title
                >
              </v-list-item>

              <v-list-item link @click="logoutUser">
                <v-list-item-title>
                  <BaseIcon prop="fas fa-sign-out-alt mr-2" />
                  Logout</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>

      <!-- login end -->

      <v-divider class="mx-4 d-none d-sm-flex" inset vertical></v-divider>
      <v-btn
        class="d-none d-sm-flex"
        text
        large
        @click="getBootcamps"
        color="white"
        link
        :to="{ name: 'bootcamps' }"
        >Browse Bootcamps</v-btn
      >
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import router from '../../router/index';
import NProgress from 'nprogress';

export default {
  computed: mapGetters(['getToken', 'getAuthUser']),
  props: {
    source: String
  },
  data: () => ({
    drawer: false,
    icons: [
      'fab fa-facebook',
      'fab fa-twitter',
      'fab fa-google-plus',
      'fab fa-linkedin',
      'fab fa-instagram'
    ]
  }),

  methods: {
    ...mapActions(['logout', 'getAllBootcamps']),
    logoutUser() {
      this.logout();

      if (router.history.current.name !== 'Home') {
        router.push('/');
      }
    },
    getBootcamps() {
      NProgress.start();
      this.getAllBootcamps().then(res => {
        if (res && res.data.success) {
          NProgress.done();
        }
      });
    }
  }
};
</script>

<style scoped>
.logo,
.fa-logo,
.fas,
.far,
.side_nav_color {
  color: #fff;
}


.app_footer {
  margin-top: 10rem;
  color: #fff;
}

/* mobile phone screen sm <= 425px */
@media screen and (max-width: 425px) {
  .app_footer {
    margin-top: 10rem;
  }
}
</style>
