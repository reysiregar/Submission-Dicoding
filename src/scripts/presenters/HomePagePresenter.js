// src/scripts/presenters/HomePagePresenter.js
// (Untuk saat ini, kita panggil langsung dari dalam App.js atau routing
//  karena struktur presenter perlu penyesuaian dengan lifecycle routing)

// Cara yang lebih tepat (akan diintegrasikan dengan router nanti):
// Presenter harus diinstansiasi oleh Router atau App saat halaman terkait aktif.
// Router.js
// ...
// const page = routes[path] || routes['/404'];
// const view = new page(); // Misal HomePage
// if (path === '/' || path === '/home') {
//   new HomePagePresenter({ view, model: MovieModel });
// }
// ...

// Contoh integrasi sederhana dalam HomePage.js (afterRender)
// atau dalam App.js setelah routing:

// src/scripts/views/App.js atau modifikasi di Router.js
// Setelah render halaman oleh router:
// if (page instanceof HomePage) { // Cek apakah halaman yang dirender adalah HomePage
//   const homePagePresenter = new HomePagePresenter({
//     view: page, // Instance HomePage yang baru dibuat oleh router
//     model: MovieModel, // MovieModel class
//   });
//   await homePagePresenter.displayPopularMovies();
//   // Inisialisasi peta juga bisa dilakukan di sini atau di afterRender HomePage
// }

// Untuk sekarang, kita buat kelas Presenter-nya dulu:
class HomePagePresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;
    this._initialize();
  }

  async _initialize() {
    await this._displayPopularMovies();
  }

  async _displayPopularMovies() {
    this._view.showLoading(); // Tampilkan indikator loading
    try {
      const movies = await this._model.getPopularMovies();
      if (movies) {
        this._view.showMovies(movies);
      } else {
        this._view.showError('Tidak ada film populer yang ditemukan.');
      }
    } catch (error) {
      console.error('Error fetching popular movies for presenter:', error);
      this._view.showError(error.message || 'Gagal memuat film.');
    }
  }
}

export default HomePagePresenter;