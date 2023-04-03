import './util.js';
import './form.js';
import './scale.js';
import './effects.js';
import {renderPosts} from './thumbnail.js';
import {getData} from './api.js';
import { showAlert } from './util.js';

// getData()
//   .then((posts) => {
//     renderPosts(posts);
//   })
//   .catch((err) => {
//     showAlert(err.message);
//   });
getData();
