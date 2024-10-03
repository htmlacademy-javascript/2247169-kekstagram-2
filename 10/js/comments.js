const COMMENTS_COUNT = 5;
let currentCount = 0;
let comments = [];

const socialCommentsElement = document.querySelector('.social__comments');
const commentTemplateElement = socialCommentsElement.querySelector('.social__comment');
const commentsTotalElement = document.querySelector('.social__comment-count');
const commentsCountElement = commentsTotalElement.querySelector('.social__comment-shown-count');
const commentsTotalCountElement = commentsTotalElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = document.querySelector('.comments-loader');
socialCommentsElement.innerHTML = '';

const getCommentElement = (commentElements) => {
  const fragment = document.createDocumentFragment();

  commentElements.forEach(({avatar, name, message}) => {
    const commentElement = commentTemplateElement.cloneNode(true);

    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;

    fragment.appendChild(commentElement);
  });

  socialCommentsElement.appendChild(fragment);
};

const renderNextComments = () => {
  const nextComments = comments.slice(currentCount, currentCount + COMMENTS_COUNT);
  const newCommentsCount = nextComments.length + currentCount;

  getCommentElement(nextComments);

  commentsCountElement.textContent = newCommentsCount;

  if (newCommentsCount >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }

  currentCount += nextComments.length;
};

const resetComments = () => {
  currentCount = 0;
  socialCommentsElement.innerHTML = '';
  commentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
};

const renderComments = (pictureComments) => {
  comments = pictureComments;
  renderNextComments();

  commentsTotalCountElement.textContent = comments.length;
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
};

function onCommentsLoaderClick() {
  renderNextComments();
}

export { renderComments, resetComments };
