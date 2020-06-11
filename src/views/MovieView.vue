<template>
  <div class="movie-view">
    <button @click="$router.go(-1)">Back to list</button>
    <h1>{{ movie.Title }}</h1>
    <img :src="movie.Poster" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
  name: 'MovieView',
  props: {
    movieId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(['movie']),
  },
  methods: {
    ...mapActions(['resetMovie']),
  },
  beforeRouteLeave(to, from, next) {
    this.resetMovie();
    next();
  },
});
</script>
