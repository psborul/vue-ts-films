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

  test('if it is not last page, there should be button load more', () => {
    expect(store.getters.isLastPage).toBe(false);
    expect(MovieListComponent.contains('.movie-list__btn')).toBe(true);
  });

  test('if we click the load more btn, we should not get empty array', async () => {
    MovieListComponent.find('button.movie-list__btn').trigger('click');
    expect(store.state.movies).not.toBe([]);
  });
});
