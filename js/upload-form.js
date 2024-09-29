import { isEscapeKey } from './utils.js';
import { pristine } from './upload-form-validation.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileElement = uploadFormElement.querySelector('.img-upload__input');
const modalElement = uploadFormElement.querySelector('.img-upload__overlay');
const closeButtonElement = modalElement.querySelector('.img-upload__cancel');

const openUploadModal = () => {
  modalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonElement.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadModal = () => {
  modalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  uploadFormElement.reset();
  pristine.reset();
};

function onCloseButtonClick () {
  closeUploadModal();
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    evt.preventDefault();
    closeUploadModal();
  }
}

const onSubmitUploadForm = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadFormElement.submit();
  }
};

const showUploadModal = () => {
  uploadFileElement.addEventListener('change', openUploadModal);
};

uploadFormElement.addEventListener('submit', onSubmitUploadForm);

export { showUploadModal };
