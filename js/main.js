const PHOTO_COUNT = 25;

const Like = {
  MIN: 15,
  MAX: 200
};

const Comment = {
  MIN: 0,
  MAX: 30
};

const CommentIdRange = {
  MIN: 1,
  MAX: 57
};

const Avatar = {
  MIN: 1,
  MAX: 6
};

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
  const commentId = createRandomId(CommentIdRange.MIN, CommentIdRange.MAX);

  return () => ({
    id: commentId(),
    avatar: `img/avatar-${getRandomInteger(Avatar.MIN, Avatar.MAX)}.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  });
};

const createPhotos = () => {
  const getId = createRandomId(1, PHOTO_COUNT);

  return () => {
    const id = getId();

    return {
      id,
      url: `photos/${id}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(Like.MIN, Like.MAX),
      comments: Array.from({length: getRandomInteger(Comment.MIN, Comment.MAX)}, createComment()),
    };
  };
};

const getPhotos = () => Array.from({length: PHOTO_COUNT}, createPhotos());
getPhotos();
