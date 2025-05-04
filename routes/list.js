const ListPage = {
    async render(container) {
      const section = document.createElement('section');
      section.innerHTML = `
        <h1>Daftar Cerita</h1>
        <div id="story-list">Memuat cerita...</div>
      `;
      container.appendChild(section);
  
      try {
        const response = await fetch('https://story-api.dicoding.dev/v1/stories');
        const data = await response.json();
  
        const storyList = document.getElementById('story-list');
        if (data.stories && data.stories.length > 0) {
          storyList.innerHTML = data.stories.map(story => `
            <div class="story-item">
              <img src="${story.photoUrl}" alt="${story.title}">
              <h2>${story.title}</h2>
              <p>${story.description}</p>
              <p><strong>Lokasi:</strong> ${story.location}</p>
            </div>
          `).join('');
        } else {
          storyList.innerHTML = '<p>Tidak ada cerita untuk ditampilkan.</p>';
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        const storyList = document.getElementById('story-list');
        storyList.innerHTML = '<p>Gagal memuat cerita. Coba lagi nanti.</p>';
      }
    }
  };
  
  export default ListPage;