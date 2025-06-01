// src/scripts/views/templates/template-creator.js
import CONFIG from '../../globals/config';

const createMovieItemTemplate = (movie) => `
  <article class="movie-item">
    <a href="#/detail/<span class="math-inline">\{movie\.id\}" class\="movie\-item\_\_link"\>
        <img class="movie-item__thumbnail" src="${CONFIG.BASE_IMAGE_URL}${movie.poster_path}" alt="${movie.title}">
        <div class="movie-item__content">
            <h3 class="movie-item__title">${movie.title}</h3>
            <p class="movie-item__release-date">Release Date: ${movie.release_date}</p>
            <p class="movie-item__overview">${movie.overview}</p>
        </div>
    </a>
  </article>
`;

const createMovieDetailTemplate = (movie) => `
  <h2 class="movie-detail__title">${movie.title || 'Tanpa Judul'}</h2>
  <img class="movie-detail__poster" src="${movie.poster_path ? CONFIG.BASE_IMAGE_URL + movie.poster_path : 'https://via.placeholder.com/500x750?text=No+Image'}" alt="Poster film ${movie.title || 'Tanpa Judul'}">
  <div class="movie-detail__info">
    <h3>Informasi</h3>
    <h4>Tagline</h4>
    <p>${movie.tagline || '-'}</p>
    <h4>Tanggal Rilis</h4>
    <p>${movie.release_date || 'Tidak diketahui'}</p>
    <h4>Durasi</h4>
    <p>${movie.runtime ? movie.runtime + ' menit' : '-'}</p>
    <h4>Rating</h4>
    <p>${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} (${movie.vote_count} suara)</p>
    <h4>Genre</h4>
    <p>${movie.genres && movie.genres.length > 0 ? movie.genres.map(genre => genre.name).join(', ') : '-'}</p>
  </div>
  <div class="movie-detail__overview">
    <h3>Overview</h3>
    <p>${movie.overview || 'Tidak ada overview.'}</p>
  </div>
`;

export { createMovieItemTemplate, createMovieDetailTemplate };