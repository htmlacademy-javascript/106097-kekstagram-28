import {isEscapeKey, isEnterKey} from './util.js';

const MAX_HASHTAGS_AMOUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const REGEXP = new RegExp('^#[a-zа-яё0-9]{1,19}$', 'i');

const formElement = document.querySelector('.img-upload__form');
const uploadElement = formElement.querySelector('#upload-file');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const previewPopupCancelBtn = formElement.querySelector('#upload-cancel');
const hashtagsElement = formElement.querySelector('.text__hashtags');
const descriptionElement = formElement.querySelector('.text__description');

const pristineForHashtags = new Pristine(formElement, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const pristineForDescription = new Pristine(formElement, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const openPreviewPopup = () => {
  overlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePreviewPopup = () => {
  overlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  formElement.reset();
  pristineForHashtags.reset();
  pristineForDescription.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !(document.activeElement === descriptionElement) && !(document.activeElement === hashtagsElement)) {
    evt.preventDefault();
    closePreviewPopup();
  }
}

const onCancelBtnKeydown = (evt) => {
  if (isEnterKey(evt)) {
    closePreviewPopup();
  }
};

uploadElement.addEventListener('change', () => {

  // Показать изображение
  openPreviewPopup();
});

const validateHashtagsAmount = () => {
  const hashtags = hashtagsElement.value
    .trim()
    .split(/\s+/);
  if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
    return false;
  }
  return true;
};

const validateHashtagsUniqueness = () => {
  const lowerCaseHashtags = hashtagsElement.value
    .trim()
    .split(/\s+/)
    .toLowerCase();

  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

const validateHashtag = () => {
  const hashtags = hashtagsElement.value
    .trim()
    .split(/\s+/);
  return hashtags.every((element) => REGEXP.test(element));
};

pristineForHashtags.addValidator(hashtagsElement, validateHashtagsAmount, 'Можно указать максимум 5 хештегов');
pristineForHashtags.addValidator(hashtagsElement, validateHashtagsUniqueness, 'Хештеги не должны повторяться');
pristineForHashtags.addValidator(hashtagsElement, validateHashtag, 'Введите корректный хештег');

const validateDescription = () => descriptionElement.value.length <= MAX_DESCRIPTION_LENGTH;

pristineForDescription.addValidator(descriptionElement, validateDescription, 'Максимальная длина комментария 140 символов');

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristineForHashtags.validate();
  pristineForDescription.validate();
});

previewPopupCancelBtn.addEventListener('click', onCancelBtnKeydown);
previewPopupCancelBtn.addEventListener('keydown', onCancelBtnKeydown);
