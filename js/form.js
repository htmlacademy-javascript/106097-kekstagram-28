import {isEscapeKey, isEnterKey, showAlert} from './util.js';
import { sendData } from './api.js';

const MAX_HASHTAGS_AMOUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const REGEXP = new RegExp('^#[a-zа-яё0-9]{1,19}$', 'i');
const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const formElement = document.querySelector('.img-upload__form');
const uploadElement = formElement.querySelector('#upload-file');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const previewPopupCancelBtn = formElement.querySelector('.img-upload__cancel');
const hashtagsElement = formElement.querySelector('.text__hashtags');
const descriptionElement = formElement.querySelector('.text__description');
const uploadFormElement = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
const errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
const errorPopupBtn = errorPopupTemplate.querySelector('.error__button');

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
  document.body.classList.remove('modal-open');
  overlayElement.classList.add('hidden');
  uploadFormElement.classList.remove('has-success');
  formElement.reset();
  pristineForHashtags.reset();
  pristineForDescription.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
};

function closeSuccessPopup () {
  document.body.classList.remove('modal-open');
  const successPopupElement = document.querySelector('.success');
  successPopupElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !(document.activeElement === descriptionElement) && !(document.activeElement === hashtagsElement)) {
    evt.preventDefault();
    closePreviewPopup();
  }
}

const onCancelButtonKeydown = (evt) => {
  if (isEnterKey(evt)) {
    closePreviewPopup();
  }
};

const onCancelButtonClick = closePreviewPopup;

const showSuccessPopup = () => {
  const successPopupElement = successPopupTemplate.cloneNode(true);
  const successPopupBtn = successPopupElement.querySelector('.success__button');
  successPopupBtn.addEventListener('click', () => {
    closeSuccessPopup();
  });
  document.addEventListener('keydown', onDocumentKeydown);
  // Добавить закрытие окна при клике вне окна
  document.body.append(successPopupElement);
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
    .toLowerCase()
    .split(/\s+/);

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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onSuccess = () => {
  closePreviewPopup();
  showSuccessPopup();
};

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  console.log(validateDescription());
  const isValid = pristineForHashtags.validate() && pristineForDescription.validate();

  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(onSuccess)
      .catch((err) => {
        showAlert(err.message);
      })
      .finally(unblockSubmitButton);
  }
});

previewPopupCancelBtn.addEventListener('click', onCancelButtonClick);
previewPopupCancelBtn.addEventListener('keydown', onCancelButtonKeydown);
