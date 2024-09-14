import { renderThumbnails } from './thumbnail.js';
import { renderBigPicture } from './big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');

const initializeGallery = (photos) => {
  renderThumbnails(photos, picturesContainerElement);

  picturesContainerElement.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');

    if (currentPicture) {
      evt.preventDefault();
      const currentPhoto = photos.find((photo) => photo.id === Number(currentPicture.dataset.id));
      renderBigPicture(currentPhoto);
    }
  });
};

export { initializeGallery };
