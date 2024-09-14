import { getPhotos } from './get-photos.js';
import { initializeGallery } from './gallery.js';

const photos = getPhotos();
initializeGallery(photos);
