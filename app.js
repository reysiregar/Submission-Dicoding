import ListPage from './routes/list.js';
import AddPage from './routes/add.js';
import NotFound from './routes/not-found.js';

const main = document.getElementById('main');

const routes = {
  '#list': ListPage,
  '#add': AddPage,
};

function router() {
  const hash = location.hash || '#list';
  const page = routes[hash] || NotFound;
  main.innerHTML = '';
  page.render(main);
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);