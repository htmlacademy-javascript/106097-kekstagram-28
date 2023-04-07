import { isEscapeKey, isEnterKey } from './util.js';
import { sendData } from './api.js';
import { pristine } from './validation.js';
import { showSuccessPopup, showErrorPopup } from './message.js';

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

const onError = (message) => {
  closePreviewPopup();
  showErrorPopup(message);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    blockSubmitButton();
    sendData(new FormData(evt.target), onError)
      .then(onSuccess)
      .catch((err) => onError(err.message))
      .finally(unblockSubmitButton);
  }
};

uploadElement.addEventListener('change', openPreviewPopup);
formElement.addEventListener('submit', onFormSubmit);
previewPopupCancelBtn.addEventListener('click', onCancelButtonClick);
previewPopupCancelBtn.addEventListener('keydown', onCancelButtonKeydown);
