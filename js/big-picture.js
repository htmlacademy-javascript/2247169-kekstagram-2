import { isEscapeKey } from './utils.js';

const bigPicturesContainer = document.querySelector('.big-picture');
const bigImage = bigPicturesContainer.querySelector('.big-picture__img img');
const likesCount = bigPicturesContainer.querySelector('.likes-count');
const commentsContainer = bigPicturesContainer.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');
const commentsCount = bigPicturesContainer.querySelector('.social__comment-shown-count');
const commentsCountTotal = bigPicturesContainer.querySelector('.social__comment-count');
const commentsLoader = bigPicturesContainer.querySelector('.comments-loader');
const photoDescription = bigPicturesContainer.querySelector('.social__caption');
const bigPicturesCancel = bigPicturesContainer.querySelector('.big-picture__cancel');

const closeBigPicture = () => {
  bigPicturesContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const renderBigPicture = (id, photos) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(id));
  const commentsFragment = document.createDocumentFragment();

  bigImage.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  commentsCount.textContent = currentPhoto.comments.length;
  commentsContainer.innerHTML = '';

  currentPhoto.comments.forEach((comment) => {
    const commentObject = commentTemplate.cloneNode(true);

    commentObject.querySelector('.social__picture').src = comment.avatar;
    commentObject.querySelector('.social__picture').alt = comment.name;
    commentObject.querySelector('.social__text').textContent = comment.message;

    commentsFragment.appendChild(commentObject);
  });

  commentsContainer.appendChild(commentsFragment);
  photoDescription.textContent = currentPhoto.description;
  commentsCountTotal.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPicturesContainer.classList.remove('hidden');

  bigPicturesCancel.addEventListener('click', closeBigPicture);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

export { renderBigPicture };
