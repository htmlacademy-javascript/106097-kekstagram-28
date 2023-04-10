import { debounce } from './util.js';
import './form.js';
import './scale.js';
import './effects.js';
import { renderPosts } from './thumbnail.js';
import { getData } from './api.js';
import { showUploadErrorPopup } from './message.js';
import { showFilters, setDefaultOrder, setRandomOrder, renderRandomPosts, setDiscussedOrder, renderDiscussedOrder } from './filters.js';

getData((posts) => {
  renderPosts(posts);
  setDefaultOrder(debounce(() => renderPosts(posts)));
  setRandomOrder(debounce(() => renderRandomPosts(posts)));
  setDiscussedOrder(debounce((() => renderDiscussedOrder(posts))));
  showFilters();
}, showUploadErrorPopup);
