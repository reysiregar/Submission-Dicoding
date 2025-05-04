const NotFound = {
    render(container) {
      const section = document.createElement('section');
      section.innerHTML = `
        <h1>Halaman Tidak Ditemukan</h1>
        <p>Maaf, halaman yang Anda minta tidak tersedia.</p>
      `;
      container.appendChild(section);
    }
  };
  
  export default NotFound;
