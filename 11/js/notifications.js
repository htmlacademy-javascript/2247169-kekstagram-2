import { isEscapeKey } from './utils.js';

const MESSAGE_TIMEOUT = 5000;

const errorTemplate = document.querySelector('#data-error').content;
const bodyElement = document.body;

const showErrorMessage = () => {
  const errorPlaceElement = errorTemplate.cloneNode(true);

  bodyElement.append(errorPlaceElement);

  const errorDataElement = bodyElement.querySelector('.data-error');

  setTimeout(() => {
    errorDataElement.remove();
  }, MESSAGE_TIMEOUT);

};

const closeNotification = (evt) => {
  evt.stopPropagation();
  const templateElement = document.querySelector('.success') || document.querySelector('.error');
  const closeSuccessButtonElement = templateElement.querySelector('.success__button');
  const closeErrorButtonElement = templateElement.querySelector('.error__button');

  if (evt.target === templateElement || evt.target === closeSuccessButtonElement || evt.target === closeErrorButtonElement || isEscapeKey(evt)) {
    templateElement.remove();
    bodyElement.removeEventListener('click', closeNotification);
    bodyElement.removeEventListener('keydown', closeNotification);
  }
};

const showNotification = (template) => {
  const notificationElement = template.cloneNode(true);
  bodyElement.append(notificationElement);
  bodyElement.addEventListener('click', closeNotification);
  bodyElement.addEventListener('keydown', closeNotification);
};

export { showErrorMessage, closeNotification, showNotification };
