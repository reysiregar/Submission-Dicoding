// src/scripts/models/MovieModel.js
import TmdbSource from '../data/tmdb-source';

class MovieModel {
  static async getPopularMovies() {
    return TmdbSource.getPopularMovies();
  }

  // Tambahkan method lain jika perlu, misal getNowPlayingMovies()
}

export default MovieModel;