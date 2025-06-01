// src/scripts/views/pages/detail-page.js
import MovieModel from '../../models/MovieModel';
import DetailPagePresenter from '../../presenters/DetailPagePresenter'; // Akan dibuat
import { createMovieDetailTemplate, createLikeButtonTemplate } from '../templates/template-creator'; // Modifikasi template-creator
import CONFIG from '../../globals/config';

class DetailPage {
  constructor() {
    this.id = null; // Akan diisi oleh Router
  }

  async render() {
    if (!this.id) {
      return '<p>Movie ID is missing. Cannot load details.</p>';
    }
    // Tampilkan struktur loading awal
    return `
      <section id="movie-detail" class="movie-detail-container">
        <p>Loading movie details...</p>
      </section>
      <div id="likeButtonContainer"></div>
    `;
  }

  async afterRender() {
    if (!this.id) return;

    // Inisialisasi presenter
    new DetailPagePresenter({
      view: this,
      model: MovieModel,
      movieId: this.id, // Kirim movieId ke presenter
      likeButtonContainer: document.querySelector('#likeButtonContainer'), // Untuk tombol like
    });
  }

  showMovieDetail(movie) {
    const detailContainer = document.querySelector('#movie-detail');
    if (detailContainer) {
      detailContainer.innerHTML = createMovieDetailTemplate(movie);
    }
  }

  showLoading() {
    const detailContainer = document.querySelector('#movie-detail');
    if (detailContainer) {
      detailContainer.innerHTML = '<p>Loading movie details...</p>';
    }
  }

  showError(message) {
    const detailContainer = document.querySelector('#movie-detail');
    if (detailContainer) {
      detailContainer.innerHTML = `<p class="error-message">Error: ${message}</p>`;
    }
  }
}

export default DetailPage;