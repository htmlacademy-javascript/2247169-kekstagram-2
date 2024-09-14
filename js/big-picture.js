import { isEscapeKey } from './utils.js';
import { renderComments, clearComments } from './comments.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const closeBigPicture = () => {
  clearComments();

  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  cancelButtonElement.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const renderBigPicture = ({comments, description, url, likes}) => {
  bigImageElement.src = url;
  bigImageElement.alt = description;
  likesCountElement.textContent = likes;
  socialCaptionElement.textContent = description;

  renderComments(comments);

  bigPictureElement.classList.remove('hidden');
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function onCancelButtonClick() {
  closeBigPicture();
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export { renderBigPicture };
