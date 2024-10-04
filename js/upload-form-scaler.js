import { imageElement } from './utils';

const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  DEFAULT: 100,
};

const decreaseButtonElement = document.querySelector('.scale__control--smaller');
const increaseButtonElement = document.querySelector('.scale__control--bigger');
const scaleControlElement = document.querySelector('.scale__control--value');

const setScale = (value) => {
  scaleControlElement.value = `${value}%`;
  imageElement.style.transform = `scale(${value / 100})`;
};

const onDecreaseButtonClick = () => {
  const scaleValue = parseInt(scaleControlElement.value, 10) - Scale.STEP;
  if (scaleValue >= Scale.MIN) {
    setScale(scaleValue);
  }
};

const onIncreaseButtonClick = () => {
  const scaleValue = parseInt(scaleControlElement.value, 10) + Scale.STEP;
  if (scaleValue <= Scale.MAX) {
    setScale(scaleValue);
  }
};

const addScaleListener = () => {
  decreaseButtonElement.addEventListener('click', onDecreaseButtonClick);
  increaseButtonElement.addEventListener('click', onIncreaseButtonClick);
};

const removeScaleListener = () => {
  decreaseButtonElement.removeEventListener('click', onDecreaseButtonClick);
  increaseButtonElement.removeEventListener('click', onIncreaseButtonClick);
};

const resetScale = () => {
  setScale(Scale.DEFAULT);
};

export { addScaleListener, removeScaleListener, resetScale };
