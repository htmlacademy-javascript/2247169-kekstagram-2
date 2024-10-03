const EFFECTS = {
  none: {
    filter: 'none'
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

const imageElement = document.querySelector('.img-upload__preview img');
const effectContainerElement = document.querySelector('.img-upload__effect-level');
const effectlValueElement = document.querySelector('.effect-level__value');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectsListElement = document.querySelector('.effects__list');
const effectsRadioElement = document.querySelectorAll('.effects__radio');

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

effectSliderElement.noUiSlider.on('update', () => {
  effectlValueElement.value = effectSliderElement.noUiSlider.get();
});

const resetEffect = () => {
  effectContainerElement.classList.add('hidden');
  imageElement.style.filter = 'none';
};

const onEffectsChange = () => {
  effectsRadioElement.forEach((effectRadio) => {
    const effectValue = effectRadio.value;
    const effectName = EFFECTS[effectValue];

    if (effectRadio.checked) {
      if (effectValue !== 'none') {
        effectContainerElement.classList.remove('hidden');
        effectSliderElement.noUiSlider.updateOptions({
          range: {
            min: effectName.min,
            max: effectName.max,
          },
          start: effectName.start,
          step: effectName.step,
        });
        effectSliderElement.noUiSlider.on('update', () => {
          imageElement.style.filter = `${effectName.filter}(${effectlValueElement.value}${effectName.unit})`;
        });
      } else {
        resetEffect();
      }
    }
  });
};

effectsListElement.addEventListener('change', onEffectsChange);

export {resetEffect};
