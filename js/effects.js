const DEFAULT_EFFECT = 'none';

const effects = {
  chrome: {
    filterName: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    filterName: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    filterName: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    filterName: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    filterName: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const imagePreview = document.querySelector('.img-upload__preview img');
const effectsElements = document.querySelectorAll('.effects__item');
const defaultEffectElement = document.querySelector('#effect-none');
const effectLevelElement = document.querySelector('.img-upload__effect-level');
const effectLevelInput = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');

let effectName, filterName, filterValue, filterUnit;

const resetEffects = () => {
  defaultEffectElement.checked = true;
  imagePreview.classList = 'effects__preview--none';
  imagePreview.style.filter = null;
  effectLevelElement.style.display = 'none';
};

resetEffects();

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
});

sliderElement.noUiSlider.on('slide', () => {
  filterValue = sliderElement.noUiSlider.get();
  effectLevelInput.value = filterValue;
  imagePreview.style.filter = `${filterName}(${filterValue}${filterUnit})`;
});

const onEffectChange = (evt) => {
  effectName = evt.target.value;
  imagePreview.removeAttribute('style');
  imagePreview.className = `effects__preview--${effectName}`;

  if (evt.target.value === DEFAULT_EFFECT) {
    effectLevelElement.style.display = 'none';
  } else {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effects[effectName].min,
        max: effects[effectName].max,
      },
      start: effects[effectName].max,
      step: effects[effectName].step,
    });
    filterName = effects[effectName].filterName;
    filterUnit = effects[effectName].unit;
    effectLevelElement.style.display = 'block';
  }
};

effectsElements.forEach((element) => element.addEventListener('change', onEffectChange));

export { resetEffects };
