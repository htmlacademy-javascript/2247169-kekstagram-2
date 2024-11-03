import { DEBOUNCE_DELAY } from './const.js';

const imageElement = document.querySelector('.img-upload__preview img');
const picturesContainerElement = document.querySelector('.pictures');

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { imageElement, picturesContainerElement, isEscapeKey, debounce };
