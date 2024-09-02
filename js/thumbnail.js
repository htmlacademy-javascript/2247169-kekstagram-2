import { getPhotos } from './get-photos.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photos = getPhotos();
const container = document.querySelector('.pictures');

const createThumbnail = (photo) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  thumbnail.href = photo.url;
  thumbnail.dataset.id = photo.id;

  const image = thumbnail.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;

  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;

  return thumbnail;
};

const fragment = document.createDocumentFragment();

photos.forEach((photo) => {
  const thumbnail = createThumbnail(photo);
  fragment.appendChild(thumbnail);
});

container.appendChild(fragment);
