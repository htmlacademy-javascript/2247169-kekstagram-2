import { getPhotos } from './get-photos.js';
import { renderThumbnails } from './thumbnail.js';

const photosArray = getPhotos();
renderThumbnails(photosArray);
