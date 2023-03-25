import {isEscapeKey, isEnterKey} from './util.js';

const MAX_HASHTAGS_AMOUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const formElement = document.querySelector('.img-upload__form');
const uploadElement = formElement.querySelector('#upload-file');
const overlayElement = formElement.querySelector('.img-upload__overlay');
// const imgPreview = document.querySelector('.img-upload__preview img');
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
  const hashtags = hashtagsElement.value.split(' ');
  if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
    return false;
  }
  return true;
};

const validateHashtagsUniqueness = () => {
  const hashtags = hashtagsElement.value.split(' ');
  const filteredHashtags = hashtags.filter((element) => element !== '');
  if (filteredHashtags.length === 1) {
    return true;
  }


  for (let i = 0; i < filteredHashtags.length; i++) {
    const hashtagsLeft = filteredHashtags.slice(i + 1);
    if (hashtagsLeft.includes(filteredHashtags[i])) {
      return false;
    }
  }

  return true;
};

const validateHashtag = () => {
  const hashtags = hashtagsElement.value.split(' ');

  const regexp = new RegExp('^#[a-zа-яё0-9]{1,19}$', 'i');
  for (let i = 0; i < hashtags.length; i++) {
    if (!regexp.test(hashtags[i])) {
      return false;
    }
  }

  return true;
};

pristineForHashtags.addValidator(hashtagsElement, validateHashtagsAmount, 'Можно указать максимум 5 хештегов');
pristineForHashtags.addValidator(hashtagsElement, validateHashtagsUniqueness, 'Хештеги не должны повторяться');
pristineForHashtags.addValidator(hashtagsElement, validateHashtag, 'Введите корректный хештег');

const validateDescription = () => {
  if (descriptionElement.value.length > MAX_DESCRIPTION_LENGTH) {
    return false;
  }

  return true;
};

pristineForDescription.addValidator(descriptionElement, validateDescription, 'Максимальная длина комментария 140 символов');

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristineForHashtags.validate();
  pristineForDescription.validate();
});

previewPopupCancelBtn.addEventListener('click', onCancelBtnKeydown);
previewPopupCancelBtn.addEventListener('keydown', onCancelBtnKeydown);
