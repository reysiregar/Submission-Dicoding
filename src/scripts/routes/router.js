// src/scripts/routes/router.js
import routes from './routes'; // Objek yang memetakan path ke fungsi render halaman

class Router {
  static init() {
    window.addEventListener('hashchange', this.handleRouteChange.bind(this));
    window.addEventListener('load', this.handleRouteChange.bind(this)); // Untuk initial load
  }

  static async handleRouteChange() {
    const path = window.location.hash.slice(1).toLowerCase() || '/'; // Ambil path dari hash, default ke '/'
    const page = routes[path] || routes['/404']; // Cari halaman, atau fallback ke 404

    const mainContent = document.querySelector('#main-content'); // Target elemen untuk render
    if (mainContent) {
      mainContent.innerHTML = ''; // Kosongkan konten lama
      try {
        const pageInstance = new page(); // Buat instance dari class halaman
        const renderedPage = await pageInstance.render(); // Panggil method render
        if (typeof renderedPage === 'string') {
          mainContent.innerHTML = renderedPage;
        } else if (renderedPage instanceof HTMLElement) {
          mainContent.appendChild(renderedPage);
        }
        await pageInstance.afterRender(); // Panggil method afterRender jika ada
      } catch (error) {
        console.error('Error rendering page:', error);
        mainContent.innerHTML = '<p>Error loading page. Please try again later.</p>';
      }
    } else {
      console.error("Element with id 'main-content' not found.");
    }
  }
}

document.startViewTransition(async () => {
  await updateDom();
});

export default Router;