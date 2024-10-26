import { isEscapeKey } from './utils.js';

const MESSAGE_TIMEOUT = 5000;

const bodyElement = document.body;
const errorTemplate = document.querySelector('#data-error').content;
const successUploadTemplate = document.querySelector('#success').content.querySelector('.success');
const errorUploadTemplate = document.querySelector('#error').content.querySelector('.error');

const notificationTypeToTemplate = {
  success: successUploadTemplate,
  error: errorUploadTemplate,
};

const showErrorMessage = () => {
  const errorPlaceElement = errorTemplate.cloneNode(true);

  bodyElement.append(errorPlaceElement);

  const errorDataElement = bodyElement.querySelector('.data-error');

  setTimeout(() => {
    errorDataElement.remove();
  }, MESSAGE_TIMEOUT);

};

const closeNotification = () => {
  const templateElement = document.querySelector('.notification');

  templateElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showNotification = (type) => {
  const notificationElement = notificationTypeToTemplate[type].cloneNode(true);
  const buttonElement = notificationElement.querySelector(`.${type}__button`);

  buttonElement.addEventListener('click', () => {
    closeNotification();
  });

  notificationElement.addEventListener('click', (evt) => {
    if (evt.target === notificationElement) {
      closeNotification();
    }
  });

  bodyElement.append(notificationElement);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeNotification();
  }
}

export { showErrorMessage, closeNotification, showNotification };
