const API_URL = 'https://story-api.dicoding.dev/v1/stories';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLXdpalp4N3Y4N0xTd0J4SDEiLCJpYXQiOjE3NDYzNjM2MzZ9.67XS2BURhH_E2MhXlFk_iJ6qWGyNe4X7JJiLJgTc5bM'; // Ganti dengan API key dari Dicoding

const StoryModel = {
  async fetchStories() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data.stories || [];
    } catch (error) {
      console.error('Error fetching stories:', error);
      return [];
    }
  },

  async addStory(storyData) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(storyData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding story:', error);
      return { error: 'Gagal menambah cerita' };
    }
  }
};

export default StoryModel;
