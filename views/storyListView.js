const StoryListView = {
    render(stories) {
      const storyList = document.getElementById('story-list');
      if (stories.length > 0) {
        storyList.innerHTML = stories.map(story => `
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
    }
  };
  
  export default StoryListView;