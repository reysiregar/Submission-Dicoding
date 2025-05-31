// src/scripts/views/pages/add-movie-page.js
import L from 'leaflet'; // Kita akan butuh Leaflet di sini
import 'leaflet/dist/leaflet.css'; // Dan CSS-nya

class AddMoviePage {
  async render() {
    return `
      <section class="content add-movie-form-container">
        <h2 class="content__heading">Tambah Film Baru (Dummy)</h2>
        <form id="addMovieForm">
          <div class="form-group">
            <label for="movieTitle">Judul Film:</label>
            <input type="text" id="movieTitle" name="title" required>
          </div>
          <div class="form-group">
            <label for="movieDescription">Deskripsi:</label>
            <textarea id="movieDescription" name="description" rows="4" required></textarea>
          </div>
          <div class="form-group">
            <label for="movieReleaseDate">Tanggal Rilis:</label>
            <input type="date" id="movieReleaseDate" name="releaseDate" required>
          </div>

          <div class="form-group">
            <label for="movieImage">Gambar Poster (Ambil dengan Kamera/Pilih File):</label>
            <input type="file" id="movieImage" name="image" accept="image/*" capture="camera">
            <img id="imagePreview" src="#" alt="Preview Gambar" style="max-width: 200px; margin-top: 10px; display: none;">
          </div>

          <p>Pilih Lokasi (klik pada peta):</p>
          <div id="formMap" style="height: 300px; width: 100%; margin-bottom: 15px;"></div>

          <input type="hidden" id="movieLatitude" name="latitude">
          <input type="hidden" id="movieLongitude" name="longitude">

          <button type="submit" class="btn btn-primary">Simpan Film</button>
        </form>
      </section>
    `;
  }

  async afterRender() {
    this._initImagePreview();
    this._initFormMap();
    this._initFormSubmit();
  }

  _initImagePreview() {
    const movieImageInput = document.querySelector('#movieImage');
    const imagePreview = document.querySelector('#imagePreview');

    movieImageInput.addEventListener('change', () => {
      const file = movieImageInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.src = e.target.result;
          imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      } else {
        imagePreview.src = '#';
        imagePreview.style.display = 'none';
      }
    });
  }

  _initFormMap() {
    const formMapContainer = document.querySelector('#formMap');
    if (!formMapContainer) return;

    const jakartaCoordinates = [-6.2088, 106.8456];
    this.formMap = L.map('formMap').setView(jakartaCoordinates, 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.formMap);

    this.formMarker = null; // Untuk menyimpan marker yang dipilih

    this.formMap.on('click', (e) => {
      const { lat, lng } = e.latlng;
      document.querySelector('#movieLatitude').value = lat.toFixed(6);
      document.querySelector('#movieLongitude').value = lng.toFixed(6);

      if (this.formMarker) {
        this.formMarker.setLatLng(e.latlng);
      } else {
        this.formMarker = L.marker(e.latlng).addTo(this.formMap);
      }
      this.formMarker.bindPopup(`Lokasi dipilih: ${lat.toFixed(4)}, ${lng.toFixed(4)}`).openPopup();
    });

    // Fix ukuran peta jika tersembunyi awalnya
    setTimeout(() => {
        this.formMap.invalidateSize();
    }, 100);
  }

  _initFormSubmit() {
    const form = document.querySelector('#addMovieForm');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const movieData = {
        title: formData.get('title'),
        description: formData.get('description'),
        releaseDate: formData.get('releaseDate'),
        // Untuk gambar, kita hanya akan log nama file atau ukuran untuk dummy
        imageName: formData.get('image') ? formData.get('image').name : 'Tidak ada gambar',
        imageSize: formData.get('image') ? formData.get('image').size : 0,
        latitude: formData.get('latitude'),
        longitude: formData.get('longitude'),
      };

      console.log('Data Film (Dummy):', movieData);
      alert('Data film (dummy) berhasil disiapkan! Cek console log.');

      // Contoh kirim ke json-server (jika Anda menggunakannya)
      // try {
      //   const response = await fetch('http://localhost:3000/movies', { // Ganti URL jika perlu
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(movieData), // Kirim data yang sudah diolah
      //   });
      //   if (response.ok) {
      //     alert('Film berhasil ditambahkan (ke json-server)!');
      //     form.reset(); // Reset form
      //     document.querySelector('#imagePreview').style.display = 'none';
      //     if (this.formMarker) {
      //       this.formMap.removeLayer(this.formMarker);
      //       this.formMarker = null;
      //     }
      //     document.querySelector('#movieLatitude').value = '';
      //     document.querySelector('#movieLongitude').value = '';
      //     // Mungkin redirect ke halaman utama
      //     // window.location.hash = '#/'; 
      //   } else {
      //     alert('Gagal menambahkan film.');
      //   }
      // } catch (error) {
      //   console.error('Error submitting form:', error);
      //   alert('Terjadi kesalahan saat mengirim data.');
      // }
    });
  }
}
export default AddMoviePage;