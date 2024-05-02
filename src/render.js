import { openModal } from './modal/modal.js';
import stateManager from './state.js';
// 새롭게 영화들을 렌더링 하기 이전에 페이지 초기화
export const renderMovieList = () => {
  const $movieList = document.querySelector('.movieList');
  $movieList.innerHTML = ''; // 이전 목록을 초기화
  makeMovieList($movieList);
};

// //각 영화에 대한 HTML 요소를 생성
export const makeMovieList = ($container) => {
  const state = stateManager.getState();
  state.movieData.forEach((movie) => {
    const $movie = document.createElement('div');
    $movie.className = 'movie';
    $movie.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
      <h2 class='movieTitle'>${movie.title}</h2>
      <p>${movie.overview}</p>
      <p class='rating'>Rating: ${movie.vote_average}</p>
    `;
    $movie.id = movie.id;
    $container.appendChild($movie);
    $movie.addEventListener('click', () => {
      openModal(`영화 id: ${movie.id}`);
    });
  });
};