import 'regenerator-runtime'; // Untuk async/await jika tidak menggunakan Babel dg benar
import '../public/styles/main.css'; // Impor CSS global
import App from './views/App'; // Komponen utama aplikasi
import Router from './routes/router'; // Impor Router

// Inisialisasi App (mungkin akan membuat custom element seperti app-bar)
const app = new App({
  button: document.querySelector('#hamburgerButton'), // Jika ada hamburger
  drawer: document.querySelector('#navigationDrawer'), // Jika ada drawer
  content: document.querySelector('#main-content'),
});

// Inisialisasi Router ketika DOM sudah siap
document.addEventListener('DOMContentLoaded', () => {
  Router.init();
});