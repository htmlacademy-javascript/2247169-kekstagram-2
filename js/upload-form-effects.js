import { imageElement } from './utils.js';

const effectsConfig = {
  none: {
    filter: 'none',
    min: 0,
    max: 0,
    start: 0,
    step: 0,
    unit: '',
  },

  chrome: {
    filter:'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },

  sepia: {
    filter:'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: ''
  },

  marvin: {
    filter:'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '%'
  },

  phobos: {
    filter:'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    unit: 'px'
  },

  heat: {
    filter:'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    unit: ''
  }
};

const effectContainerElement = document.querySelector('.img-upload__effect-level');
const effectsValueElement = document.querySelector('.effect-level__value');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectsListElement = document.querySelector('.effects__list');

let currentEffect = 'none';

effectContainerElement.classList.add('hidden');

noUiSlider.create(effectSliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const updateSliderOptions = (effect) => {
  effectSliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max
    },
    start: effect.start,
    step: effect.step,
  });
};

const applyEffect = (effect, currentValue) => {
  effectsValueElement.value = currentValue;
  imageElement.style.filter = `${effect.filter}(${effectsValueElement.value}${effect.unit})`;
};

const resetEffect = () => {
  effectContainerElement.classList.add('hidden');
  imageElement.style.filter = 'none';
};

const onEffectsChange = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    const effectValue = evt.target.value;
    if (effectValue !== 'none') {
      effectContainerElement.classList.remove('hidden');
      currentEffect = effectsConfig[effectValue];
      updateSliderOptions(currentEffect);
    } else {
      resetEffect();
    }
  }
};

effectSliderElement.noUiSlider.on('update', () => {
  effectsValueElement.value = effectSliderElement.noUiSlider.get();
  applyEffect(currentEffect, effectsValueElement.value);
});

effectsListElement.addEventListener('change', onEffectsChange);

export {resetEffect};
