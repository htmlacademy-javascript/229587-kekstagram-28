import { isEscapeKey } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

let successMessageClone;
let errorMessageClone;

const renderMessage = (element) => document.body.append(element);

const createErrorMessage = () => {
  errorMessageClone = errorTemplate.cloneNode(true);
  renderMessage(errorMessageClone);
  errorMessageClone.addEventListener('click', onErrorMessageClick);
  document.addEventListener('keydown', onErrorMessageKeydown);
};

const removeErrorMessage = () => {
  errorMessageClone.remove();
  document.removeEventListener('keydown', onErrorMessageKeydown);
};

const createSuccessMessage = () => {
  successMessageClone = successTemplate.cloneNode(true);
  renderMessage(successMessageClone);
  successMessageClone.addEventListener('click', onSuccessMessageClick);
  document.addEventListener('keydown', onSuccessMessageKeydown);
};

const removeSuccessMessage = () => {
  successMessageClone.remove();
  document.removeEventListener('keydown', onSuccessMessageKeydown);
};

function onErrorMessageKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeErrorMessage();
  }
}

function onSuccessMessageKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeSuccessMessage();
  }
}

function onErrorMessageClick(evt) {
  evt.preventDefault();
  if (evt.target.closest('.error__button') || evt.target.matches('.error')) {
    removeErrorMessage();
  }
}

function onSuccessMessageClick(evt) {
  evt.preventDefault();
  if (evt.target.closest('.success__button') || evt.target.matches('.success')) {
    removeSuccessMessage();
  }
}

export { createErrorMessage, createSuccessMessage };
