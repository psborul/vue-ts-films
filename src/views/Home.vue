<template>
  <div class="home">
    <img
      alt="Batman logo"
      src="../assets/logo.png"
    />
    <HelloWorld :msg="msg" />
    <MovieList />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import MovieList from '@/components/MovieList.vue';

import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    MovieList,
  },
  computed: {
    ...mapState(['user']),
    msg() {
      return `Hello ${this.user.name}, which batman movie do you want to see?`;
    },
  },
};
</script>
