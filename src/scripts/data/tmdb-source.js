// src/scripts/data/tmdb-source.js
import CONFIG from '../globals/config';
import API_ENDPOINT from '../globals/api-endpoint';

class TmdbSource {
  static async getPopularMovies() {
    try {
      const response = await fetch(API_ENDPOINT.POPULAR_MOVIES);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseJson = await response.json();
      return responseJson.results; // `results` berisi array film
    } catch (error) {
      console.error('Failed to fetch popular movies:', error);
      return null; // Atau lempar error lagi untuk ditangani di Presenter
    }
  }

  static async getNowPlayingMovies() {
    // Mirip dengan getPopularMovies, tapi menggunakan API_ENDPOINT.NOW_PLAYING
    try {
      const response = await fetch(API_ENDPOINT.NOW_PLAYING);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseJson = await response.json();
      return responseJson.results;
    } catch (error) {
      console.error('Failed to fetch now playing movies:', error);
      return null;
    }
  }

  static async getMovieDetail(id) {
    // Endpoint untuk detail film biasanya: API_ENDPOINT.DETAIL(id)
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
       if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Failed to fetch movie detail for id ${id}:`, error);
      return null;
    }
  }
}

export default TmdbSource;