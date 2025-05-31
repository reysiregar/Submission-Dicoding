// src/scripts/views/pages/home-page.js
import MovieModel from '../../models/MovieModel'; // Perlu import model
import HomePagePresenter from '../../presenters/HomePagePresenter'; // Import presenter
import { createMovieItemTemplate } from '../templates/template-creator';

class HomePage {
    async render() {
        return `
        <section class="content">
            <h2 class="content__heading">Film Populer</h2>
            <div id="movies" class="movies-list">
            </div>
            <div id="map-container" style="margin-top: 30px;">
            <h2>Lokasi Bioskop di Jakarta</h2>
            <div id="map" style="height: 400px; width: 100%;"></div>
            </div>
        </section>
        `;
    }

    async afterRender() {
        // Inisialisasi presenter setelah halaman dirender
        new HomePagePresenter({ view: this, model: MovieModel });
        // Inisialisasi peta juga bisa di sini
        this._initializeMap();
    }

    showMovies(movies) {
        const moviesContainer = document.querySelector('#movies');
        if (!moviesContainer) {
        console.error("Element with id 'movies' not found.");
        return;
        }
        moviesContainer.innerHTML = ''; // Kosongkan dulu
        if (movies && movies.length > 0) {
        movies.forEach((movie) => {
            moviesContainer.innerHTML += createMovieItemTemplate(movie);
        });
        } else {
        moviesContainer.innerHTML = '<p class="movies-not-found">Film tidak ditemukan.</p>';
        }
    }

    showLoading() {
        const moviesContainer = document.querySelector('#movies');
        if (moviesContainer) {
            moviesContainer.innerHTML = '<p>Loading movies...</p>';
        }
    }

    showError(message) {
        const moviesContainer = document.querySelector('#movies');
        if (moviesContainer) {
            moviesContainer.innerHTML = `<p class="movies-not-found">Error: ${message}</p>`;
        }
    }

    _initializeMap() {
    const mapContainer = document.querySelector('#map');
    if (!mapContainer) {
      console.warn("Map container not found, skipping map initialization.");
      return;
    }

    // Koordinat Jakarta Pusat
    const jakartaCoordinates = [-6.2088, 106.8456];
    const map = L.map('map').setView(jakartaCoordinates, 12); // Zoom level 12

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Data Bioskop (minimal 5)
    const cinemas = [
      { name: 'XXI Plaza Senayan', lat: -6.2252, lon: 106.7991, address: 'Plaza Senayan Lt. 5, Jl. Asia Afrika No.8, Jakarta Pusat' },
      { name: 'CGV Grand Indonesia', lat: -6.1967, lon: 106.8226, address: 'Grand Indonesia West Mall Lt. 8, Jl. M.H. Thamrin No.1, Jakarta Pusat' },
      { name: 'XXI Epicentrum Walk', lat: -6.2201, lon: 106.8305, address: 'Epicentrum Walk Ground Floor, Jl. H. R. Rasuna Said, Jakarta Selatan' },
      { name: 'Flix Cinema Ashta District 8', lat: -6.2299, lon: 106.8091, address: 'ASHTA District 8 Lt. 2, SCBD Lot 28, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan' },
      { name: 'Cinépolis Pejaten Village', lat: -6.2826, lon: 106.8308, address: 'Pejaten Village Lt. 3, Jl. Warung Jati Barat No.39, Jakarta Selatan' }
    ];

    cinemas.forEach(cinema => {
      const marker = L.marker([cinema.lat, cinema.lon]).addTo(map);
      marker.bindPopup(`<b><span class="math-inline">\{cinema\.name\}</b\><br\></span>{cinema.address}`);
    });

    // Fix untuk masalah tile yang tidak muncul kadang-kadang karena timing Webpack
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
    }
}

export default HomePage;