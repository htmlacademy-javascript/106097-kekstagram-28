import './util.js';
import {createPosts} from './data.js';
import {renderPosts} from './thumbnail.js';
import './form.js';

const posts = createPosts();
renderPosts(posts);
