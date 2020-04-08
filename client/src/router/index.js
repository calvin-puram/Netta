import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@views/Home.vue';
import Bootcamps from '@views/Bootcamp_Pages/Bootcamps.vue';
import Bootcamp from '@views/Bootcamp_Pages/Bootcamp.vue';
import Login from '@views/auth/Login.vue';
import Register from '@views/auth/Register.vue';
import store from '@store/index';
import ForgotPassword from '@views/auth/ForgotPassword.vue';
import ResetPassword from '@views/auth/ResetPassword.vue';
import BootcampReviews from '@views/Bootcamp_Pages/BootcampReviews.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/bootcamps',
    name: 'bootcamps',
    component: Bootcamps
  },

  {
    path: '/bootcamp/:slug',
    name: 'bootcamp',
    component: Bootcamp,

    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/bootcamp/:id/:slug/reviews',
    name: 'bootcamp_reviews',
    component: BootcampReviews,

    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/forgot_password',
    name: 'forgotPassword',
    component: ForgotPassword,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/resetpassword/:token',
    name: 'resetPassword',
    component: ResetPassword,
    props: true,
    meta: {
      requiresGuest: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.getToken) {
      next('/login');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.getToken) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
