const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = (photo) => {
  const thumbnailElement = pictureTemplate.cloneNode(true);
  thumbnailElement.dataset.id = photo.id;

  const imageElement = thumbnailElement.querySelector('.picture__img');
  imageElement.src = photo.url;
  imageElement.alt = photo.description;

  thumbnailElement.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnailElement.querySelector('.picture__likes').textContent = photo.likes;

  return thumbnailElement;
};

const renderThumbnails = (photos, containerElement) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnailElement = createThumbnail(photo);
    fragment.appendChild(thumbnailElement);
  });

  containerElement.appendChild(fragment);
};

export { renderThumbnails };
