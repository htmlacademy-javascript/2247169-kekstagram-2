import { isEscapeKey } from './utils.js';
import { validateForm, resetValidateForm } from './upload-form-validation.js';
import { addScaleListener, removeScaleListener, resetScale } from './upload-form-scaler.js';
import { resetEffect } from './upload-form-effects.js';
import { sendData } from './api.js';
import { showNotification } from './notifications.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileElement = uploadFormElement.querySelector('.img-upload__input');
const modalElement = uploadFormElement.querySelector('.img-upload__overlay');
const closeButtonElement = modalElement.querySelector('.img-upload__cancel');
const submitButtonElement = modalElement.querySelector('.img-upload__submit');
const succesUploadTemplate = document.querySelector('#success').content;
const errorUploadTemplate = document.querySelector('#error').content;

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю. Пожалуйста, подождите.'
};

const openUploadModal = () => {
  modalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonElement.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  addScaleListener();
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
  if (isEscapeKey(evt) && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
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
        showNotification(succesUploadTemplate);
      })
      .catch(() => {
        showNotification(errorUploadTemplate);
      })
      .finally(() => {
        enableSubmitButton(SubmitButtonText.IDLE);
      });
  }
};

uploadFileElement.addEventListener('change', openUploadModal);
uploadFormElement.addEventListener('submit', onSubmitUploadForm);
