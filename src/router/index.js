import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import Posts from '@/views/Posts.vue';
import EditPost from '@/views/EditPost.vue';
import CreatePost from '@/views/CreatePost.vue';
import store from '@/store';

const checkUser = (next) => {
  if (!store.state.user || store.state.user.role === 'reader') {
    next('/');
  } else {
    next();
  }
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Posts,
  },
  {
    path: '/login',
    component: Login,
    beforeEnter(to, from, next) {
      if (store.getters.loggedIn) {
        next(false);
      } else {
        next();
      }
    },
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditPost,
    beforeEnter(to, from, next) {
      checkUser(next);
    },
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePost,
    beforeEnter(to, from, next) {
      checkUser(next);
    },
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
