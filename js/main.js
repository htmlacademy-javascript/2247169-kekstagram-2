import { getPhotos } from './get-photos.js';
import { initializeGallery } from './gallery.js';
import { showUploadModal } from './upload-form.js';

const photos = getPhotos();
initializeGallery(photos);
showUploadModal();
