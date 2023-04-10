const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const changePreviewScale = (value) => {
  imagePreview.style.transform = `scale(${value})`;
};

const resetScale = () => {
  scaleValue.setAttribute('value', `${SCALE_DEFAULT}%`);
  changePreviewScale(SCALE_DEFAULT / 100);
};

const changeScale = (step) => {
  let scale = parseInt(scaleValue.value, 10);
  scale += step;

  if (scale < SCALE_MIN) {
    scale = SCALE_MIN;
  } else if (scale > SCALE_MAX) {
    scale = SCALE_MAX;
  }

  changePreviewScale(scale / 100);
  scaleValue.setAttribute('value', `${scale}%`);
};

const onControlSmallerClick = () => changeScale(-SCALE_STEP);
const onControlBiggerClick = () => changeScale(SCALE_STEP);

scaleControlSmaller.addEventListener('click', onControlSmallerClick);
scaleControlBigger.addEventListener('click', onControlBiggerClick);

resetScale();

export { resetScale };
