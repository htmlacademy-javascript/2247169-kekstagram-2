import { isEscapeKey } from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const commentTemplateElement = socialCommentsElement.querySelector('.social__comment');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentsTotalElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const picturesCancelElement = bigPictureElement.querySelector('.big-picture__cancel');

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  picturesCancelElement.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const renderComments = (currentPhotoComments) => {
  const commentsFragment = document.createDocumentFragment();
  socialCommentsElement.innerHTML = '';

  currentPhotoComments.forEach((comment) => {
    const commentElement = commentTemplateElement.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    commentsFragment.appendChild(commentElement);
  });

  socialCommentsElement.appendChild(commentsFragment);
  commentsTotalElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
};

const renderBigPicture = (currentPhoto) => {
  bigImageElement.src = currentPhoto.url;
  likesCountElement.textContent = currentPhoto.likes;
  commentsCountElement.textContent = currentPhoto.comments.length;
  socialCaptionElement.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  bigPictureElement.classList.remove('hidden');
  picturesCancelElement.addEventListener('click', closeBigPicture);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export { renderBigPicture };
