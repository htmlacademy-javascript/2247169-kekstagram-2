const PHOTO_ARRAY_LENGTH = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const DESCRIPTIONS = ['Bonjour!', 'Это я в отпуске.', 'Это мой кот. Он красивый.', 'Привет. Как дела?', 'Я и закат.', 'Очень усердно пишу код.', 'На даче с бабушкой. Набрал уже 10кг.'];
const COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = [
  'Кекс',
  'Феликс',
  'Бетховен',
  'Лисса',
  'Барсик',
  'Марсик',
  'Маруся',
  'Кейси',
  'Персиваль',
  'Муся',
  'Лейси',
  'Фенек',
  'Юта'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => {
  const commentId = createRandomId(1, 57);

  return () => {
    const comments = {};
    comments.id = commentId();
    comments.avatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
    comments.message = getRandomArrayElement(COMMENTS);
    comments.name = getRandomArrayElement(NAMES);
    return comments;
  };
};

const createPhotos = () => {
  const photoId = createRandomId(1, 25);
  const urlId = createRandomId(1, 25);

  return () => {
    const photo = {};
    photo.id = photoId();
    photo.url = `photos/${urlId()}.jpg`;
    photo.description = getRandomArrayElement(DESCRIPTIONS);
    photo.likes = getRandomInteger(MIN_LIKES, MAX_LIKES);
    photo.comments = Array.from({length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)}, createComment());
    return photo;
  };
};

Array.from({length: PHOTO_ARRAY_LENGTH}, createPhotos());
