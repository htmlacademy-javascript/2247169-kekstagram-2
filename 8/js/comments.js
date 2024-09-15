const COMMENTS_COUNT = 5;
let currentCount = 0;
let comments = [];

const bigPictureElement = document.querySelector('.big-picture');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const commentTemplateElement = socialCommentsElement.querySelector('.social__comment');
const commentsTotalElement = bigPictureElement.querySelector('.social__comment-count');
const commentsCountElement = commentsTotalElement.querySelector('.social__comment-shown-count');
const commentsTotalCountElement = commentsTotalElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
socialCommentsElement.innerHTML = '';

const renderNextComments = () => {
  const fragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + COMMENTS_COUNT);
  const renderedCommentsLength = renderedComments.length + currentCount;

  renderedComments.forEach(({avatar, name, message}) => {
    const commentElement = commentTemplateElement.cloneNode(true);

    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;

    fragment.appendChild(commentElement);
  });

  socialCommentsElement.appendChild(fragment);
  commentsCountElement.textContent = renderedCommentsLength;
  commentsTotalCountElement.textContent = comments.length;

  if (renderedCommentsLength >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }

  currentCount += COMMENTS_COUNT;

};

const clearComments = () => {
  currentCount = 0;
  socialCommentsElement.innerHTML = '';
  commentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.removeEventListener('click', renderNextComments);
};

const renderComments = (pictureComments) => {
  comments = pictureComments;
  renderNextComments();

  commentsLoaderElement.addEventListener('click', renderNextComments);
};

export { renderComments, clearComments };
