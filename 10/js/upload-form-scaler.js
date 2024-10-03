const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const smallerControlButton = document.querySelector('.scale__control--smaller');
const biggerControlButton = document.querySelector('.scale__control--bigger');
const scaleControlElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

const onIncreaseScale = () => {
  let scaleValue = parseInt(scaleControlElement.value, 10);
  if (scaleValue > SCALE_MIN) {
    scaleValue -= SCALE_STEP;
  }
  scaleControlElement.value = `${scaleValue}%`;
  imageElement.style.transform = `scale(${ scaleValue / 100})`;
};

const onDecreaseScale = () => {
  let scaleValue = parseInt(scaleControlElement.value, 10);
  if (scaleValue < SCALE_MAX) {
    scaleValue += SCALE_STEP;
  }
  scaleControlElement.value = `${scaleValue}%`;
  imageElement.style.transform = `scale(${ scaleValue / 100})`;
};

const addScaleHandler = () => {
  smallerControlButton.addEventListener('click', onIncreaseScale);
  biggerControlButton.addEventListener('click', onDecreaseScale);
};

const removeScaleHandler = () => {
  smallerControlButton.removeEventListener('click', onIncreaseScale);
  biggerControlButton.removeEventListener('click', onDecreaseScale);
};

const resetScale = () => {
  imageElement.style.transform = '';
  imageElement.value = `${SCALE_DEFAULT}%`;
};

export { addScaleHandler, removeScaleHandler, resetScale };
