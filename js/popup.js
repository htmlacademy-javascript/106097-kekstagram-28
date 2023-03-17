import {isEscapeKey, isEnterKey} from './util.js';

const COMMENTS_SHOW = 5;

const body = document.body;
const pictures = document.querySelector('.pictures');
const popup = document.querySelector('.big-picture');
const popupSocialElement = document.querySelector('.big-picture__social');
const popupImage = popup.querySelector('.big-picture__img img');
const popupLikes = popup.querySelector('.likes-count');
const popupCaption = popup.querySelector('.social__caption');
const commentsList = popup.querySelector('.social__comments');
const commentsCountElement = popup.querySelector('.social__comment-count');
const popupCloseButton = popup.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('li');

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

const onCloseButtonClick = closePopup;

popupCloseButton.addEventListener('click', onCloseButtonClick);
popupCloseButton.addEventListener('keydown', onCloseButtonKeydown);

const createCommentElement = ({avatar, name, message}) => {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
};

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  commentsFragment.append(...comments.map(createCommentElement));
  commentsList.appendChild(commentsFragment);
};

const loadMore = (comments) => {
  const renderedCommentsAmount = popup.querySelectorAll('.social__comment').length;
  const newComments = comments.slice(renderedCommentsAmount, renderedCommentsAmount + COMMENTS_SHOW);
  renderComments(newComments);

  updateCommentsAmount(comments.length);
};

function updateCommentsAmount (commentsLength) {
  const renderedCommentsAmount = popup.querySelectorAll('.social__comment').length;
  const commentsLeft = commentsLength - renderedCommentsAmount;

  if (commentsLength <= COMMENTS_SHOW) {
    commentsCountElement.textContent = `Комментариев: ${commentsLength}`;
  } else {
    commentsCountElement.innerHTML = `${renderedCommentsAmount} из <span class="comments-count">${commentsLength}</span> комментариев`;
  }

  const currentCommentLoader = popup.querySelector('.comments-loader');
  if (commentsLeft > 0) {
    currentCommentLoader.classList.remove('hidden');
  } else {
    currentCommentLoader.classList.add('hidden');
  }
}

function closePopup () {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const renderPictureModal = (url, likes, description) => {
  commentsList.innerHTML = '';

  popupImage.src = url;
  popupLikes.textContent = likes;
  popupCaption.textContent = description;
};

const openPopup = () => {
  popup.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const renderPopup = (url, likes, comments, description) => {
  openPopup();

  renderPictureModal(url, likes, description);
  const commentsForRender = comments.slice(0, COMMENTS_SHOW);
  renderComments(commentsForRender);
  updateCommentsAmount(comments.length);

  const currentCommentLoader = popup.querySelector('.comments-loader');
  const newCommentLoader = currentCommentLoader.cloneNode(true);
  popupSocialElement.replaceChild(newCommentLoader, currentCommentLoader);
  newCommentLoader.addEventListener('click', () => loadMore(comments));
};

const onPictureClick = (evt) => {
  if (evt.target.closest('.picture')) {
    renderPopup(evt.target.dataset.id);
  }
};

const onPictureKeydown = (evt) => {
  if (isEnterKey(evt)) {
    renderPopup(evt.target.dataset.id);
  }
};

pictures.addEventListener('click', onPictureClick);
pictures.addEventListener('keydown', onPictureKeydown);
