import {createPosts} from './data.js';

const pictureTemplate = document.querySelector('#picture').content;
const pictures = document.querySelector('.pictures');

const posts = createPosts();
const postsFragment = document.createDocumentFragment();

for (const {id, url, likes, comments} of posts) {
  const pictureElement = pictureTemplate.cloneNode(true);
  const picture = pictureElement.querySelector('.picture');

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').dataset.id = id;
  picture.dataset.id = id;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  postsFragment.appendChild(pictureElement);
}

pictures.appendChild(postsFragment);

export {posts};
