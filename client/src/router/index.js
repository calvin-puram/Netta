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
import Profile from '@views/auth/Profile.vue';
import UpdatePassword from '@views/auth/UpdatePassword.vue';
import BootcampReviews from '@views/Bootcamp_Pages/BootcampReviews.vue';
import BootcampCreateReview from '@views/Bootcamp_Pages/BootcampCreateReview.vue';
import BootcampEditReview from '@views/Bootcamp_Pages/BootcampEditReview.vue';
import BootcampAddCourse from '@views/Bootcamp_Pages/BootcampAddCourse.vue';
import BootcampEditCourse from '@views/Bootcamp_Pages/BootcampEditCourse.vue';
import BootcampAdd from '@views/Bootcamp_Pages/BootcampAdd.vue';
import BootcampEdit from '@views/Bootcamp_Pages/BootcampEdit.vue';
import ManageReview from '@views/admin/ManageReviews.vue';
import ManageBootcamp from '@views/admin/ManageBootcamp.vue';

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
    path: '/bootcamp/:id/:slug/createReview',
    name: 'bootcamp_create_reviews',
    component: BootcampCreateReview,

    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/bootcamp/:id/:slug/editReview',
    name: 'bootcamp_edit_reviews',
    component: BootcampEditReview,

    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/bootcamp/:id/:slug/bootcamp_edit',
    name: 'bootcamp_edit',
    component: BootcampEdit,

    meta: {
      requiresAuth: true
    }
  },
  // courses
  {
    path: '/create_bootcamp_courses/:slug/:id',
    name: 'create_courses',
    component: BootcampAddCourse,

    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/bootcamp/:id/:bootId/:slug/bootcamp_course',
    name: 'bootcamp_course',
    component: BootcampEditCourse,

    meta: {
      requiresAuth: true
    }
  },
  //admin
  {
    path: '/manage_reviews',
    name: 'manage_reviews',
    component: ManageReview,

    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/manage_bootcamp',
    name: 'manage_bootcamp',
    component: ManageBootcamp,

    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/create_bootcamp',
    name: 'add_bootcamp',
    component: BootcampAdd,

    meta: {
      requiresAuth: true
    }
  },
  //AUTH
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
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/update_password',
    name: 'update_password',
    component: UpdatePassword,
    props: true,
    meta: {
      requiresAuth: true
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
