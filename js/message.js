import {isEscapeKey} from './util.js';

const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
const errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
const errorUploadPopupTemplate = document.querySelector('#error--upload').content.querySelector('.error');

const closeSuccessPopup = () => {
  document.body.classList.remove('modal-open');
  const successPopupElement = document.querySelector('.success');
  if (successPopupElement) {
    successPopupElement.remove();
  }
  document.removeEventListener('keydown', onDocumentKeydown);
};

const closeErrorPopup = () => {
  document.body.classList.remove('modal-open');
  const errorPopupElement = document.querySelector('.error');
  if (errorPopupElement) {
    errorPopupElement.remove();
  }
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showSuccessPopup = () => {
  const successElement = successPopupTemplate.cloneNode(true);
  const successPopupBtn = successElement.querySelector('.success__button');
  successPopupBtn.addEventListener('click', closeSuccessPopup);
  document.addEventListener('keydown', onDocumentKeydown);
  const successPopupElement = successElement.querySelector('.success__inner');
  successPopupElement.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
  successElement.addEventListener('click', closeSuccessPopup);
  document.body.append(successElement);
};

const showErrorPopup = (message) => {
  const errorElement = errorPopupTemplate.cloneNode(true);
  errorElement.querySelector('.error__title').textContent = message;
  const errorPopupBtn = errorElement.querySelector('.error__button');
  errorPopupBtn.addEventListener('click', closeErrorPopup);
  document.addEventListener('keydown', onDocumentKeydown);
  const errorPopupElement = errorElement.querySelector('.error__inner');
  errorPopupElement.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
  errorElement.addEventListener('click', closeErrorPopup);
  document.body.append(errorElement);
};

const showUploadErrorPopup = (message) => {
  const errorUploadPopupElement = errorUploadPopupTemplate.cloneNode(true);
  errorUploadPopupElement.querySelector('.error__title').textContent = message;
  document.body.append(errorUploadPopupElement);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessPopup();
    closeErrorPopup();
  }
}

export {showSuccessPopup, showErrorPopup, showUploadErrorPopup};
