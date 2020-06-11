<template>
  <div class="movie">
    <router-link
      :to="{ name: 'MovieView', params: { movieId: movie.imdbID } }"
      class="movie__link"
    >
      {{ movie.Title }}
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

import { Movie } from '@/services/types';

export default Vue.extend({
  name: 'MovieListItem',
  props: {
    movie: {
      type: Object,
    } as PropOptions<Movie>,
  },
});
</script>

<style lang="scss" scoped>
.movie {
  display: block;
  font-size: 22px;
}

.movie__link {
  color: #000;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
