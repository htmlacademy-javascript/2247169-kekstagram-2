import { isEscapeKey } from './utils.js';
import { validateHashtags, errorHashtagMessage } from './hashtags-validation.js';
import { validateDescriptionLength, errorDescriptionMessage } from './description-validation.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileElement = uploadFormElement.querySelector('.img-upload__input');
const imageEditorForm = uploadFormElement.querySelector('.img-upload__overlay');
const closeEditorButtonElement = imageEditorForm.querySelector('.img-upload__cancel');
const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');
const commentInputElement = uploadFormElement.querySelector('.text__description');

const initUploadModal = () => {
  imageEditorForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeEditorButtonElement.addEventListener('click', onCloseEditorButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePhotoEditor = () => {
  imageEditorForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeEditorButtonElement.removeEventListener('click', onCloseEditorButtonClick);
  uploadFileElement.value = '';
};

function onCloseEditorButtonClick () {
  closePhotoEditor();
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    evt.preventDefault();
    closePhotoEditor();
  }
}

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const onSubmitUploadForm = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadFormElement.submit();
  }
};

pristine.addValidator(hashtagInputElement, validateHashtags, errorHashtagMessage);
pristine.addValidator(commentInputElement, validateDescriptionLength, errorDescriptionMessage);
uploadFileElement.addEventListener('change', initUploadModal);
uploadFormElement.addEventListener('submit', onSubmitUploadForm);
