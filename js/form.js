import {isEscapeKey, isEnterKey, showAlert} from './util.js';
import { sendData } from './api.js';
import { pristine } from './validation.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const formElement = document.querySelector('.img-upload__form');
const uploadElement = formElement.querySelector('#upload-file');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const previewPopupCancelBtn = formElement.querySelector('.img-upload__cancel');
const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsElement = formElement.querySelector('.text__hashtags');
const descriptionElement = formElement.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
const errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
const errorPopupBtn = errorPopupTemplate.querySelector('.error__button');

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
  pristine.reset();
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

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(onSuccess)
      .catch((err) => {
        showAlert(err.message);
      })
      .finally(unblockSubmitButton);
  }
};

uploadElement.addEventListener('change', openPreviewPopup);
formElement.addEventListener('submit', onFormSubmit);
previewPopupCancelBtn.addEventListener('click', onCancelButtonClick);
previewPopupCancelBtn.addEventListener('keydown', onCancelButtonKeydown);
