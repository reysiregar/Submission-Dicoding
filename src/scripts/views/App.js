// src/scripts/views/App.js

// Contoh jika Anda ingin membuat custom element <app-bar>
class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h1>Katalog Film</h1>
      <nav>
        <ul>
          <li><a href="#/home">Beranda</a></li>
          <li><a href="#/add-movie">Tambah Film</a></li>
          </ul>
      </nav>
    `;
  }
}
// Pastikan custom element hanya didefinisikan sekali
if (!customElements.get('app-bar')) {
  customElements.define('app-bar', AppBar);
}


class App {
  constructor({ button, drawer, content }) {
    this._button = button; // Untuk hamburger menu, jika ada
    this._drawer = drawer; // Untuk navigation drawer, jika ada
    this._content = content;

    // this._initialAppShell(); // Panggil method untuk inisialisasi shell jika ada
  }

  // _initialAppShell() {
    // Logika untuk hamburger menu, dll.
    // Misalnya:
    // if (this._button && this._drawer) {
    //   this._button.addEventListener('click', (event) => {
    //     this._drawer.classList.toggle('open');
    //     event.stopPropagation();
    //   });

    //   this._content.addEventListener('click', () => {
    //     this._drawer.classList.remove('open');
    //   });
    // }
  // }
}

export default App;