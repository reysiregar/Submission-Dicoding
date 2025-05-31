// src/scripts/routes/routes.js
import HomePage from '../views/pages/home-page';
import DetailPage from '../views/pages/detail-page'; // Akan dibuat nanti
import AddMoviePage from '../views/pages/add-movie-page'; // Akan dibuat nanti

const routes = {
  '/': HomePage, // Halaman utama
  '/home': HomePage,
  '/detail/:id': DetailPage, // Halaman detail dengan parameter ID
  '/add-movie': AddMoviePage, // Halaman tambah film
  // '/404': NotFoundPage, // Halaman jika rute tidak ditemukan
};

export default routes;