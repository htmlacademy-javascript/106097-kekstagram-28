import './util.js';
import './form.js';
import './scale.js';
import './effects.js';
import {renderPosts} from './thumbnail.js';
import {getData} from './api.js';
import { showUploadErrorPopup } from './message.js';

getData((posts) => {
  renderPosts(posts);
}, showUploadErrorPopup);
