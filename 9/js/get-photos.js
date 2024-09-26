import { getRandomInteger, getRandomArrayElement, createRandomId } from './utils.js';
import { DESCRIPTIONS, COMMENTS, NAMES } from './data.js';

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

export { getPhotos };
