import { getPhotos } from './get-photos.js';
import { renderThumbnails, pictures } from './thumbnail.js';
import { renderBigPicture } from './big-picture.js';
const photos = getPhotos();

/* Отрисовка миниатюр */
renderThumbnails(photos);

/* Открытие больших фотографий по клике на миниатюры */
pictures.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    evt.preventDefault();
    renderBigPicture(currentPicture.dataset.id, photos);
  }
});
