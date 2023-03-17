import {createPosts} from './data.js';
import * as popup from './popup.js';

const pictureTemplate = document.querySelector('#picture').content;
const pictures = document.querySelector('.pictures');

const posts = createPosts();
const postsFragment = document.createDocumentFragment();

const createPictureElement = ({url, likes, comments, description}) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureElement.addEventListener('click', () => {
    popup.renderPopup(url, likes, comments, description);
  });

  return pictureElement;
};

postsFragment.append(...posts.map(createPictureElement));
pictures.appendChild(postsFragment);

export {posts};
