<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left flat color="teal">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <router-link to="/">
          <BaseIcon prop="fas fa-laptop-code mr-1" />
          <span class="logo">DevCoach</span></router-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text large color="white" link to="/login" v-if="!getToken">
        <BaseIcon prop="fas fa-sign-in-alt mr-1" />
        Login</v-btn
      >
      <v-divider class="mx-4" inset vertical v-if="!getToken"></v-divider>
      <v-btn text large color="white" link to="/register" v-if="!getToken">
        <BaseIcon prop="fas fa-user-plus mr-1" />
        Register</v-btn
      >
      <!-- login -->

      <v-divider class="mx-4" inset vertical v-if="getToken"></v-divider>
      <template v-if="getToken">
        <div class="text-center">
          <v-menu open-on-hover bottom offset-y>
            <template v-slot:activator="{ on }">
              <v-btn dark v-on="on" text>
                Account<BaseIcon prop="fas fa-chevron-down ml-2" />
              </v-btn>
            </template>
            <v-list dense color="teal" dark flat>
              <v-list-item link to="/">
                <v-list-item-title>
                  <BaseIcon prop="far fa-clipboard mr-2" />
                  Manage Bootcamp</v-list-item-title
                >
              </v-list-item>

              <v-list-item link to="/">
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

      <v-divider class="mx-4" inset vertical></v-divider>
      <v-btn text large color="white" link :to="{ name: 'bootcamps' }"
        >Browse Bootcamps</v-btn
      >
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import router from '../../router/index';

export default {
  computed: mapGetters(['getToken']),
  props: {
    source: String
  },
  data: () => ({
    drawer: false
  }),

  methods: {
    ...mapActions(['logout']),
    logoutUser() {
      this.logout();
      router.push('/');
    }
  }
};
</script>

<style scoped>
.logo,
.fas {
  color: #fff;
}
</style>
