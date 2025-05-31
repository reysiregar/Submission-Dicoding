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

export { createMovieItemTemplate };