import {isEscapeKey} from './util.js';

const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
const errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
const errorUploadPopupTemplate = document.querySelector('#error--upload').content.querySelector('.error');

const closeSuccessPopup = () => {
  document.body.classList.remove('modal-open');
  const successPopupElement = document.querySelector('.success');
  successPopupElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const closeErrorPopup = () => {
  document.body.classList.remove('modal-open');
  const errorPopupElement = document.querySelector('.error');
  errorPopupElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showSuccessPopup = () => {
  const successPopupElement = successPopupTemplate.cloneNode(true);
  const successPopupBtn = successPopupElement.querySelector('.success__button');
  successPopupBtn.addEventListener('click', closeSuccessPopup);
  document.addEventListener('keydown', onDocumentKeydown);
  // Добавить закрытие окна при клике вне окна
  document.body.append(successPopupElement);
};

const showErrorPopup = (message) => {
  const errorPopupElement = errorPopupTemplate.cloneNode(true);
  errorPopupElement.querySelector('.error__title').textContent = message;
  const errorPopupBtn = errorPopupElement.querySelector('.error__button');
  errorPopupBtn.addEventListener('click', closeErrorPopup);
  document.addEventListener('keydown', onDocumentKeydown);
  // Добавить закрытие окна при клике вне окна
  document.body.append(errorPopupElement);
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
