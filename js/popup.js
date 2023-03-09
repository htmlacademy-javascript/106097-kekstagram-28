import {isEscapeKey, isEnterKey} from './util.js';
import {posts} from './avatar.js';

const body = document.querySelector('body');
const pictures = document.querySelector('.pictures');
const popup = document.querySelector('.big-picture');
const popupImage = popup.querySelector('.big-picture__img img');
const popupLikes = popup.querySelector('.likes-count');
const popupCaption = popup.querySelector('.social__caption');
const comments = popup.querySelector('.social__comments');
const commentsCount = popup.querySelector('.social__comment-count');
const popupCloseButton = popup.querySelector('.big-picture__cancel');
const commentLoader = popup.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('li');
const commentsFragment = document.createDocumentFragment();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const onCloseButtonKeydown = (evt) => {
  if (isEnterKey(evt)) {
    closePopup();
  }
};

const onCloseButtonClick = () => {
  closePopup();
};

function closePopup () {
  popup.classList.add('hidden');
  commentsCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  popupCloseButton.removeEventListener('click', onCloseButtonClick);
  popupCloseButton.removeEventListener('keydown', onCloseButtonKeydown);
}

const deleteComments = () => {
  comments.innerHTML = '';
};

const renderComments = (id) => {
  deleteComments();

  const postComments = posts[id - 1].comments;

  for (let i = 0; i < postComments.length; i++) {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = postComments[i].avatar;
    commentElement.querySelector('.social__picture').alt = postComments[i].name;
    commentElement.querySelector('.social__text').textContent = postComments[i].message;
    commentsFragment.appendChild(commentElement);
  }

  comments.appendChild(commentsFragment);
};

const renderPicture = (id) => {
  const post = posts[id - 1];

  popupImage.src = post.url;
  popupLikes.textContent = post.likes;
  commentsCount.textContent = post.comments.length;
  popupCaption.textContent = post.description;
};

function openPopup () {
  popup.classList.remove('hidden');
  commentsCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  popupCloseButton.addEventListener('click', onCloseButtonClick);
  popupCloseButton.addEventListener('keydown', onCloseButtonKeydown);
}

const onPictureClick = (evt) => {
  if (evt.target.tagName === 'IMG') {
    openPopup();
    renderPicture(evt.target.dataset.id);
    renderComments(evt.target.dataset.id);
  }
};

const onPictureKeydown = (evt) => {
  if (isEnterKey(evt)) {
    openPopup();
    renderPicture(evt.target.dataset.id);
    renderComments(evt.target.dataset.id);
  }
};

pictures.addEventListener('click', onPictureClick);
pictures.addEventListener('keydown', onPictureKeydown);
