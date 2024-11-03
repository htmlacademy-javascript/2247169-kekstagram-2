import { isEscapeKey } from './utils.js';
import { validateForm, resetValidateForm } from './upload-form-validation.js';
import { addScaleListener, removeScaleListener, resetScale } from './upload-form-scaler.js';
import { resetEffect } from './upload-form-effects.js';
import { sendData } from './api.js';
import { showNotification } from './notifications.js';
import { FILE_TYPES } from './const.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileElement = uploadFormElement.querySelector('.img-upload__input');
const modalElement = uploadFormElement.querySelector('.img-upload__overlay');
const closeButtonElement = modalElement.querySelector('.img-upload__cancel');
const submitButtonElement = modalElement.querySelector('.img-upload__submit');
const imageUploadElement = document.querySelector('.img-upload__preview').querySelector('img');
const imagePreviewEffects = document.querySelectorAll('.effects__preview');

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю. Пожалуйста, подождите.'
};

const uploadImage = () => {
  const file = uploadFileElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    imageUploadElement.src = URL.createObjectURL(file);
    imagePreviewEffects.forEach((item) => {
      item.style.backgroundImage = `url(${imageUploadElement.src})`;
    });
  }
};

const openUploadModal = () => {
  modalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonElement.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  addScaleListener();
  uploadImage();
};

const closeUploadModal = () => {
  modalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  uploadFormElement.reset();
  resetValidateForm();
  removeScaleListener();
  resetScale();
  resetEffect();
};

function onCloseButtonClick () {
  closeUploadModal();
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description') && !document.querySelector('.error')) {
    evt.preventDefault();
    closeUploadModal();
  }
}

const disableSubmitButton = (text) => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = text;
};

const enableSubmitButton = (text) => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = text;
};

const onSubmitUploadForm = (evt) => {
  evt.preventDefault();
  const isValid = validateForm();
  if (isValid) {
    disableSubmitButton(SubmitButtonText.SENDING);
    sendData(new FormData(evt.target))
      .then(() => {
        closeUploadModal();
        showNotification('success');
      })
      .catch(() => {
        showNotification('error');
      })
      .finally(() => {
        enableSubmitButton(SubmitButtonText.IDLE);
      });
  }
};

uploadFileElement.addEventListener('change', openUploadModal);
uploadFormElement.addEventListener('submit', onSubmitUploadForm);
