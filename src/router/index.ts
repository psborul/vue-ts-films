import Vue from 'vue';
import VueRouter, { Route, NavigationGuard } from 'vue-router';
import store from '@/store';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

type Next = Parameters<NavigationGuard>[2];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: async (to: Route, from: Route, next: Next) => {
      await store.dispatch('fetchMovies');
      next();
    },
  },
  {
    path: '/movies/:movieId',
    name: 'MovieView',
    props: ({ params }: { params: { movieId: string } }) => ({ movieId: params.movieId }),
    beforeEnter: async (to: Route, from: Route, next: Next) => {
      await store.dispatch('fetchMovieById', to.params.movieId);
      next();
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "movie-detail" */ '../views/MovieView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
