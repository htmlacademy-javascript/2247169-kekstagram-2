const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = (photo) => {
  const thumbnail = pictureTemplateElement.cloneNode(true);
  thumbnail.dataset.id = photo.id;

  const imageElement = thumbnail.querySelector('.picture__img');
  imageElement.src = photo.url;
  imageElement.alt = photo.description;

  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;

  return thumbnail;
};

export const renderThumbnails = (photos, container) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
  });

  container.appendChild(fragment);
};
