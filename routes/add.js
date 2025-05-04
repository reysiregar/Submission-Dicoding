const AddPage = {
    render(container) {
      const section = document.createElement('section');
      section.innerHTML = `
        <h1>Tambah Cerita Baru</h1>
        <form id="story-form">
          <label for="name">Nama:</label>
          <input type="text" id="name" name="name" required>
  
          <label for="description">Deskripsi:</label>
          <textarea id="description" name="description" required></textarea>
  
          <label for="image">Ambil Gambar:</label>
          <video id="video" autoplay></video>
          <canvas id="canvas" style="display: none;"></canvas>
          <button type="button" id="capture">Ambil</button>
  
          <label for="location">Klik pada peta untuk ambil lokasi:</label>
          <div id="map" style="height: 200px;"></div>
  
          <input type="hidden" name="lat" id="lat">
          <input type="hidden" name="lon" id="lon">
  
          <button type="submit">Kirim</button>
        </form>
      `;
      container.appendChild(section);
  
      // Setup kamera dan peta nanti di sini
    }
  };
  
  export default AddPage;