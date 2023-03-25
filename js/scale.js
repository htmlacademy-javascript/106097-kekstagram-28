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
  scaleValue.value = `${SCALE_DEFAULT}%`;
  changePreviewScale(SCALE_DEFAULT / 100);
};

scaleControlSmaller.addEventListener('click', () => {
  let scale = parseInt(scaleValue.value, 10);
  scale -= SCALE_STEP;

  if (scale < SCALE_MIN) {
    scale = SCALE_MIN;
  }

  changePreviewScale(scale / 100);
  scaleValue.value = `${scale}%`;
});

scaleControlBigger.addEventListener('click', () => {
  let scale = parseInt(scaleValue.value, 10);
  scale += SCALE_STEP;

  if (scale > SCALE_MAX) {
    scale = SCALE_MAX;
  }
  changePreviewScale(scale / 100);
  scaleValue.value = `${scale}%`;
});

resetScale();
