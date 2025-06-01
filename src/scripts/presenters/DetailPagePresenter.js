// src/scripts/presenters/DetailPagePresenter.js
class DetailPagePresenter {
  constructor({ view, model, movieId, likeButtonContainer }) {
    this._view = view;
    this._model = model;
    this._movieId = movieId;
    this._likeButtonContainer = likeButtonContainer; // Jika ada fitur like

    this._initialize();
  }

  async _initialize() {
    await this._displayMovieDetail();
    // await this._initLikeButton(); // Jika ada fitur like
  }

  async _displayMovieDetail() {
    this._view.showLoading();
    try {
      const movie = await this._model.getMovieDetail(this._movieId); // Gunakan MovieModel
      if (movie) {
        this._view.showMovieDetail(movie);
      } else {
        this._view.showError(`Detail film dengan ID ${this._movieId} tidak ditemukan.`);
      }
    } catch (error) {
      console.error('Error fetching movie detail for presenter:', error);
      this._view.showError(error.message || 'Gagal memuat detail film.');
    }
  }

  // --- Contoh untuk Fitur Like (Opsional, butuh FavoriteMovieIdb) ---
  // async _initLikeButton() {
  //   // Logika untuk inisialisasi tombol like, cek status di IDB, dll.
  //   // Misalnya:
  //   // LikeButtonInitiator.init({
  //   //   likeButtonContainer: this._likeButtonContainer,
  //   //   favoriteMovies: FavoriteMovieIdb, // Asumsikan FavoriteMovieIdb sudah ada
  //   //   movie: { // Data film minimal yang dibutuhkan tombol like
  //   //     id: this._movie.id,
  //   //     title: this._movie.title,
  //   //     poster_path: this._movie.poster_path,
  //   //     vote_average: this._movie.vote_average,
  //   //     overview: this._movie.overview,
  //   //     release_date: this._movie.release_date,
  //   //   },
  //   // });
  //   // Simpan data film yang sedang ditampilkan (_movie dari hasil fetch)
  //   // this._movie = await this._model.getMovieDetail(this._movieId); 
  // }
}

export default DetailPagePresenter;