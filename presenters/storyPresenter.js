import StoryModel from '../models/story.js';
import StoryListView from '../views/storyListView.js';
import AddStoryView from '../views/addStoryView.js';

const StoryPresenter = {
  async showStoryList() {
    const stories = await StoryModel.fetchStories();
    StoryListView.render(stories);
  },

  initAddStoryForm() {
    AddStoryView.render();
    // Tambahkan logika untuk menambah cerita
  },

  async submitNewStory(storyData) {
    const result = await StoryModel.addStory(storyData);
    if (result.error) {
      alert(result.error);
    } else {
      // Tampilkan hasil atau navigasi kembali ke daftar cerita
      alert('Cerita berhasil ditambah');
    }
  }
};

export default StoryPresenter;