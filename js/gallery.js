import { renderThumbnails } from './thumbnail.js';
import { renderBigPicture } from './big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');

const initializeGallery = (photos) => {
  renderThumbnails(photos, picturesContainerElement);

  picturesContainerElement.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');

    if (pictureElement) {
      evt.preventDefault();
      const currentPhoto = photos.find((photo) => photo.id === Number(pictureElement.dataset.id));
      renderBigPicture(currentPhoto);
    }
  });
};

export { initializeGallery };
