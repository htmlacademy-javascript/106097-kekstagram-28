const MAX_HASHTAGS_AMOUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const REGEXP = new RegExp('^#[a-zа-яё0-9]{1,19}$', 'i');
const DESCRIPTION_ERROR_MESSAGE = 'Максимальная длина комментария 140 символов';
const HASHTAG_GENERAL_ERROR_MESSAGE = 'Введите корректный хештег';
const HASHTAG_MAX_ERROR_MESSAGE = 'Можно указать максимум 5 хештегов';
const HASHTAG_UNIQUE_ERROR_MESSAGE = 'Хештеги не должны повторяться';

const formElement = document.querySelector('.img-upload__form');
const hashtagsElement = formElement.querySelector('.text__hashtags');
const descriptionElement = formElement.querySelector('.text__description');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateHashtagsAmount = () => {
  const hashtags = hashtagsElement.value
    .trim()
    .split(/\s+/);
  if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
    return false;
  }
  return true;
};

const validateHashtagsUniqueness = () => {
  const lowerCaseHashtags = hashtagsElement.value
    .trim()
    .toLowerCase()
    .split(/\s+/);

  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

const validateHashtag = () => {
  if (hashtagsElement.value === '') {
    return true;
  }

  const hashtags = hashtagsElement.value
    .trim()
    .split(/\s+/);

  return hashtags.every((element) => REGEXP.test(element));
};

const validateDescription = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

pristine.addValidator(hashtagsElement, validateHashtagsAmount, HASHTAG_MAX_ERROR_MESSAGE);
pristine.addValidator(hashtagsElement, validateHashtagsUniqueness, HASHTAG_UNIQUE_ERROR_MESSAGE);
pristine.addValidator(hashtagsElement, validateHashtag, HASHTAG_GENERAL_ERROR_MESSAGE);
pristine.addValidator(descriptionElement, validateDescription, DESCRIPTION_ERROR_MESSAGE);

export { pristine };
