// src/scripts/globals/api-endpoint.js
import CONFIG from './config';

const API_ENDPOINT = {
  POPULAR_MOVIES: `<span class="math-inline">\{CONFIG\.BASE\_URL\}movie/popular?api\_key\=</span>{CONFIG.API_KEY}&language=en-US&page=1`,
  NOW_PLAYING: `<span class="math-inline">\{CONFIG\.BASE\_URL\}movie/now\_playing?api\_key\=</span>{CONFIG.API_KEY}&language=en-US&page=1`,
  DETAIL: (id) => `<span class="math-inline">\{CONFIG\.BASE\_URL\}movie/</span>{id}?api_key=${CONFIG.API_KEY}&language=en-US`,
  // Tambahkan endpoint lain jika perlu
};

export default API_ENDPOINT;