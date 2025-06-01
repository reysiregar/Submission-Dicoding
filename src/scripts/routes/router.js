// src/scripts/routes/router.js
import routes from './routes'; // Objek yang memetakan path ke fungsi render halaman

class Router {
  static init() {
    window.addEventListener('hashchange', this.handleRouteChange.bind(this));
    window.addEventListener('load', this.handleRouteChange.bind(this)); // Untuk initial load
  }

  static _parseRequestURL() { // Helper untuk mem-parse URL menjadi bagian-bagian yang bisa digunakan
    const url = window.location.hash.slice(1).toLowerCase();
    const splittedUrl = url.split('/');
    return {
      resource: splittedUrl[1] ? `/${splittedUrl[1]}` : '/',
      id: splittedUrl[2] || null,
      verb: splittedUrl[3] || null,
    };
  }

  static _urlToRoute(parsedUrl) { // Mencocokkan parsed URL dengan definisi rute
    // Jika ada ID, cari rute yang cocok dengan pola /resource/:id
    if (parsedUrl.id) {
      const resourceWithId = `${parsedUrl.resource}/:id`;
      if (routes[resourceWithId]) {
        return routes[resourceWithId];
      }
    }
    // Jika tidak ada ID atau tidak ada rute dengan ID yang cocok, cari rute biasa
    return routes[parsedUrl.resource] || routes['/404']; // Fallback ke /404 jika ada
  }

  static async _handleRouteChange() {
    const parsedUrl = this._parseRequestURL();
    const pageDefinition = this._urlToRoute(parsedUrl); // Cari halaman, atau fallback ke 404

    if (!pageDefinition) {
      // Jika tidak ada definisi /404, tampilkan pesan error sederhana
      const mainContentNotFound = document.querySelector('#main-content');
      if (mainContentNotFound) {
        mainContentNotFound.innerHTML = '<p>Halaman tidak ditemukan.</p>';
      }
      console.error('Page not found and no /404 route defined.');
      return;
    }

    const mainContent = document.querySelector('#main-content');
    if (!mainContent) {
      console.error("Element with id 'main-content' not found.");
      return;
    }

    const updateDOMOperations = async () => {
        mainContent.innerHTML = ''; // Kosongkan konten lama
      try {
        const pageInstance = new pageDefinition(); // Buat instance dari class halaman
        // Teruskan ID ke instance halaman jika ada, agar bisa digunakan di render/afterRender
        if (parsedUrl.id) {
          pageInstance.id = parsedUrl.id; 
        }

        const renderedPage = await pageInstance.render();
        if (typeof renderedPage === 'string') {
          mainContent.innerHTML = renderedPage;
        } else if (renderedPage instanceof HTMLElement) {
          mainContent.appendChild(renderedPage);
        }
        
        await pageInstance.afterRender();
      } catch (error) {
        console.error('Error rendering page:', error);
        mainContent.innerHTML = '<p>Terjadi kesalahan saat memuat halaman.</p>';
      }
    };

    if (document.startViewTransition) {
        document.startViewTransition(updateDOMOperations);
    } else {
        await updateDOMOperations(); // Fallback
    }
  }
}

export default Router;