import { isEscapeKey, isEnterKey } from './util.js';
import { sendData } from './api.js';
import { pristine } from './validation.js';
import { showSuccessPopup, showErrorPopup } from './message.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const FILES_TYPES = ['jpg', 'jpeg', 'png', 'webp'];

const formElement = document.querySelector('.img-upload__form');
const uploadElement = formElement.querySelector('#upload-file');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const previewPopupCancelBtn = formElement.querySelector('.img-upload__cancel');
const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsElement = formElement.querySelector('.text__hashtags');
const descriptionElement = formElement.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const fileChooser = formElement.querySelector('#upload-file');
const previewImage = formElement.querySelector('.img-upload__preview img');

const onFileUpload = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILES_TYPES.some((element) => fileName.endsWith(element));
  if (matches) {
    previewImage.src = URL.createObjectURL(file);
  }
};

const openPreviewPopup = () => {
  overlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const reset = () => {
  formElement.reset();
  pristine.reset();
  previewImage.src = '';
  resetScale();
  resetEffects();
};

const closePreviewPopup = () => {
  document.body.classList.remove('modal-open');
  overlayElement.classList.add('hidden');
  uploadFormElement.classList.remove('has-success');
  reset();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const closeWithoutReset = () => {
  document.body.classList.remove('modal-open');
  overlayElement.classList.add('hidden');
  uploadFormElement.classList.remove('has-success');
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
  closeWithoutReset();
  showErrorPopup(message);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    blockSubmitButton();
    sendData(new FormData(evt.target), onSuccess, onError)
      .finally(unblockSubmitButton);
  }
};

uploadElement.addEventListener('change', openPreviewPopup);
formElement.addEventListener('submit', onFormSubmit);
previewPopupCancelBtn.addEventListener('click', onCancelButtonClick);
previewPopupCancelBtn.addEventListener('keydown', onCancelButtonKeydown);
fileChooser.addEventListener('change', onFileUpload);
