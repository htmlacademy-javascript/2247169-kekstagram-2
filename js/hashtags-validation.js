const HASHTAG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_COUNT = 5;
const HASHTAG_LENGTH = 20;

let errorMessage = '';

const errorHashtagMessage = () => errorMessage;

const validateHashtags = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if(!inputText) {
    return true;
  }

  const inputHashtags = inputText.split(/\s+/);

  const checkHashtagsRules = [
    {
      check: inputHashtags.some((hashtag) => hashtag[0] !== '#'),
      errorText: 'Хэштег должен начинаться с #',
    },
    {
      check: inputHashtags.some((hashtag) => hashtag === '#'),
      errorText: 'Хэштег не может состоять только из #',
    },
    {
      check: inputHashtags.some((hashtag) => hashtag.length > HASHTAG_LENGTH),
      errorText: `Максимальная длина хэштега должна быть ${HASHTAG_LENGTH} символов, включая решётку`,
    },
    {
      check: inputHashtags.length > HASHTAG_COUNT,
      errorText: `Максимальное количество хэштегов ${HASHTAG_COUNT}`,
    },
    {
      check:  inputHashtags.some((hashtag) => hashtag.slice(1).includes('#')),
      errorText: 'Хэштеги должны разделяться пробелом',
    },
    {
      check: inputHashtags.some((hashtag) => !HASHTAG_EXP.test(hashtag)),
      errorText: 'Хэштег должен состоять из букв и чисел',
    },
    {
      check:  inputHashtags.some((hashtag, num, array) => array.includes(hashtag, num + 1)),
      errorText: 'Хэштеги не должны повторяться',
    },
  ];

  return checkHashtagsRules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.errorText;
    }
    return !isInvalid;
  });

};

export { validateHashtags, errorHashtagMessage };
