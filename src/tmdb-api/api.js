import { options } from './option.js';
import { state } from '../state.js';
export const fetchData = async () => {
  try {
    const endpoint = state.isSearching
      ? `https://api.themoviedb.org/3/search/movie?query=${state.currentSearchQuery}&include_adult=true&language=en-US&page=${state.currentPage}`
      : `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${state.currentPage}`;

    const res = await fetch(endpoint, options);
    if (!res.ok) {
      throw new Error('에러발생!!');
    }
    return await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
export const searchData = async () => {
  state.isSearching = true;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${state.currentSearchQuery}&include_adult=true&language=en-US&page=${state.currentPage}`,
      options
    );
    if (!res.ok) {
      throw new Error('에러발생!!');
    }
    return await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
