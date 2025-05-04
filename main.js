import StoryPresenter from './presenters/storyPresenter.js';
import { initMap } from './utils/map.js';

const routes = {
  '/list': () => {
    document.startViewTransition(() => {
      document.getElementById('story-list').hidden = false;
      document.getElementById('story-form-section').hidden = true;
      StoryPresenter.showStoryList();
    });
  },
  '/add': () => {
    document.startViewTransition(() => {
      document.getElementById('story-list').hidden = true;
      document.getElementById('story-form-section').hidden = false;
      StoryPresenter.initAddStoryForm();
      initMap('map', (latlng) => {
        document.getElementById('lat').value = latlng.lat;
        document.getElementById('lon').value = latlng.lng;
      });
    });
  },
};

function router() {
  const hash = window.location.hash.slice(1) || '/list';
  const route = routes[hash];
  if (route) route();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);