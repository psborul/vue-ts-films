import { createLocalVue, mount } from '@vue/test-utils';
import MovieList from '@/components/MovieList.vue';
import Vuex from 'vuex';
import store from '@/store';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('MovieList.vue', () => {
  const MovieListComponent = mount(MovieList, {
    store,
    localVue,
  });

  test('is button load more exist', () => {
    expect(MovieListComponent.contains('button.movie-list__btn')).toBe(true);
  });

  test('if we click the load more btn, we should get new movies', async () => {
    MovieListComponent.find('button.movie-list__btn').trigger('click');
    expect(store.state.movies).not.toBe([]);
  });
});
