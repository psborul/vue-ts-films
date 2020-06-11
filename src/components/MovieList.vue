<template>
  <div class="movie-list">
    <div class="movie-list__filter">
      Filter by <select @change="sortByType($event.target.value)">
        <option
          v-for="({ value, title }) in filterOptions"
          :key="value"
          :value="value"
        >
          {{ title }}
        </option>
      </select>
      <button
        v-if="isLastPage"
        @click="resetPage"
        class="btn btn--filter"
      >
        To first page
      </button>
    </div>
    <MovieListItem
      v-for="movie in movies"
      :key="movie.imdbID"
      :movie="movie"
    />
    <button
      :disabled="isLastPage"
      @click="loadMoreMovies"
      class="btn movie-list__btn"
    >
      Load more
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState, mapGetters } from 'vuex';
import MovieListItem from './MovieListItem.vue';

const filterOptions = [
  {
    value: 'movie',
    title: 'movie',
  },
  {
    value: 'series',
    title: 'series',
  },
];

export default Vue.extend({
  name: 'MovieList',
  components: {
    MovieListItem,
  },
  computed: {
    ...mapState(['movies', 'pagination']),
    ...mapGetters(['totalPages', 'isLastPage']),
    filterOptions() {
      return filterOptions;
    },
  },
  methods: {
    ...mapActions(['loadMoreMovies', 'sortByType', 'resetPage']),
  },
});
</script>

<style lang="scss" scoped>
.btn {
  padding: 10px 10px;
  border: 1px solid #000;
  color: #000;
  cursor: pointer;
  outline: none;
  text-transform: uppercase;
  border-radius: 15px;
}

.btn--filter {
  margin-left: 15px;
}

.movie-list__btn {
  padding: 15px 15px;
  background: #fde311;
  margin-top: 25px;
}

.movie-list__filter {
  margin-bottom: 25px;
}

.movie-list__btn:disabled {
  padding: 15px 15px;
  background: #fde311;
  opacity: 0.5;
}
</style>
