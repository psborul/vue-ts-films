import Vue from 'vue';
import Vuex from 'vuex';
import MovieService from '@/services/MovieService';

import Movie from '../models/Movie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      name: 'Bob Razowski',
      apiToken: '273b9080',
    },
    movie: {} as Movie,
    movies: [] as Movie[],
    pagination: {
      page: 1,
      numberOfResult: 0,
      perPage: 10,
    },
    type: 'movie',
  },
  mutations: {
    SET_MOVIE(state, movie: Movie) {
      state.movie = movie;
    },
    SET_MOVIES(state, movies: Movie[]) {
      state.movies = movies;
    },
    RESET_MOVIE(state) {
      state.movie = new Movie();
    },
    NEXT_PAGE(state) {
      state.pagination.page += 1;
    },
    SET_TYPE(state, type: string) {
      state.type = type;
    },
    SET_NUMBER_OF_RESULTS(state, quantity: number) {
      state.pagination.numberOfResult = quantity;
    },
    RESET_PAGE(state) {
      state.pagination.page = 1;
    },
  },
  getters: {
    apiToken: ({ user }) => user.apiToken,
    totalPages: ({ pagination }) => Math.ceil((pagination.numberOfResult) / pagination.perPage),
    isLastPage: ({ pagination }, getters) => getters.totalPages === pagination.page,
  },
  actions: {
    async fetchMovieById({ getters, commit }, id: string) {
      const movie = await MovieService.movieService.getSpecificMovie(getters.apiToken, id);
      commit('SET_MOVIE', movie);
    },
    async fetchMovies({ getters, state, commit }) {
      const { pagination: { page }, type } = state;
      // eslint-disable-next-line max-len
      const { result, numberOfResult } = await MovieService.movieService.getMovieList(getters.apiToken, page, type);
      commit('SET_MOVIES', result);
      commit('SET_NUMBER_OF_RESULTS', numberOfResult);
    },
    async loadMoreMovies({ commit, dispatch }) {
      commit('NEXT_PAGE');
      dispatch('fetchMovies');
    },
    sortByType({ commit, dispatch }, type: string) {
      commit('SET_TYPE', type);
      dispatch('resetPage');
    },
    resetPage({ commit, dispatch }) {
      commit('RESET_PAGE');
      dispatch('fetchMovies');
    },
    resetMovie({ commit }) {
      commit('RESET_MOVIE');
    },
  },
});
