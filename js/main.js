import { getPhotos } from './get-photos.js';
import { initializeGallery } from './gallery.js';
import './upload-form.js';

const photos = getPhotos();
initializeGallery(photos);
