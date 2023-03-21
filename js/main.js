import './util.js';
import {createPosts} from './data.js';
import {renderPosts} from './thumbnail.js';

const posts = createPosts();
renderPosts(posts);
