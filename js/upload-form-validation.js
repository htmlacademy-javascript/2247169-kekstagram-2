const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_DESC_LENGTH = 140;
const errorMessages = {
  INVALID_HASHTAG_PREFIX: 'Хэштег не может состоять только из #',
  INVALID_HASHTAG_COUNT: `Максимальное количество хэштегов ${MAX_HASHTAG_COUNT}`,
  INVALID_HASHTAG_LENGTH: `Максимальная длина хэштега должна быть ${MAX_HASHTAG_LENGTH} символов, включая решётку`,
  INVALID_HASHTAG_PATTERN: 'Хэштег должен состоять из букв и чисел',
  INVALID_HASHTAG_START_WITH: 'Хэштег должен начинаться с #',
  INVALID_HASHTAG_SPACE: 'Хэштеги должны разделяться пробелом',
  INVALID_HASHTAG_UNIQUE: 'Хэштеги не должны повторяться',
  INVALID_DESC_LENGTH: `Длина комментария не может составлять больше ${MAX_DESC_LENGTH} символов`,
};

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagInputElement = document.querySelector('.text__hashtags');
const descriptionInputElement = document.querySelector('.text__description');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const getHashtagsFromInput = (value) => value.toLowerCase().trim().split(/\s+/).filter((item) => item);

const validateHashtagStart = (value) => getHashtagsFromInput(value).every((hashtag) => hashtag[0] === '#');

const validateHashtagPrefix = (value) => getHashtagsFromInput(value).every((hashtag) => hashtag !== '#');

const validateHashtagLength = (value) => getHashtagsFromInput(value).every((hashtag) => hashtag.length <= MAX_HASHTAG_LENGTH);

const validateHashtagsCount = (value) => getHashtagsFromInput(value).length <= MAX_HASHTAG_COUNT;

const validateHashtagSpace = (value) => {
  if (value === '') {
    return true;
  }

  return !getHashtagsFromInput(value).some((hashtag) => hashtag.slice(1).includes('#'));
};

const validateHashtagUnique = (value) => {
  const hashtags = getHashtagsFromInput(value);

  const uniqueHashtags = new Set(hashtags);

  return uniqueHashtags.size === hashtags.length;
};

const validateHashtagPattern = (value) => getHashtagsFromInput(value).every((hashtag) => HASHTAG_PATTERN.test(hashtag));

const validateDescriptionLength = (value) => value.length <= MAX_DESC_LENGTH;

pristine.addValidator(hashtagInputElement, validateHashtagsCount, errorMessages.INVALID_HASHTAG_COUNT, 1, true);
pristine.addValidator(hashtagInputElement, validateHashtagLength, errorMessages.INVALID_HASHTAG_LENGTH, 4, true);
pristine.addValidator(hashtagInputElement, validateHashtagSpace, errorMessages.INVALID_HASHTAG_SPACE, 5, true);
pristine.addValidator(hashtagInputElement, validateHashtagUnique, errorMessages.INVALID_HASHTAG_UNIQUE, 2, true);
pristine.addValidator(hashtagInputElement, validateHashtagStart, errorMessages.INVALID_HASHTAG_START_WITH, 7, true);
pristine.addValidator(hashtagInputElement, validateHashtagPrefix, errorMessages.INVALID_HASHTAG_PREFIX, 6, true);
pristine.addValidator(hashtagInputElement, validateHashtagPattern, errorMessages.INVALID_HASHTAG_PATTERN, 3, true);

pristine.addValidator(descriptionInputElement, validateDescriptionLength, errorMessages.INVALID_DESC_LENGTH);

export { pristine };
