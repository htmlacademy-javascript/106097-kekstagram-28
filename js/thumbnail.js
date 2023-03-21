import {renderPopup} from './popup.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const createPictureElement = ({url, likes, comments, description}) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureElement.addEventListener('click', () => {
    renderPopup(url, likes, comments, description);
  });

  return pictureElement;
};

const renderPosts = (posts) => {
  pictures.append(...posts.map(createPictureElement));
};


export {renderPosts};
