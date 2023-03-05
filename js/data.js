import {getRandomInteger, getRandomArrayElement, createIdGenerator} from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Николай',
  'Александра',
  'Вероника',
  'Инна',
  'Сергей',
  'Наталья',
  'Жанна'
];

const DESCRIPTIONS = [
  'Лето. Солнце. Пляж.',
  'Моя галерея оживает в путешествиях.',
  'Мой завтрак #vegan #healty',
  'Купили новую машину, поэтому продаём старую'
];

const LIKES_MIN = 15;
const LIKES_MAX = 200;

const COMMENTS_MIN = 1;
const COMMENTS_MAX = 15;

const AVATAR_ID_MIN = 1;
const AVATAR_ID_MAX = 6;

const POSTS_AMOUNT = 25;

const generatePostId = createIdGenerator();
const generateCommentId = createIdGenerator();

const createComment = () => {
  const CommentId = generateCommentId();
  const createRandomAvatarId = getRandomInteger(AVATAR_ID_MIN, AVATAR_ID_MAX);

  return {
    id: CommentId,
    avatar: `img/avatar-${createRandomAvatarId}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};

const createComments = (createCommentsAmount) => Array.from({ length: createCommentsAmount }, createComment);

const createPost = () => {
  const postId = generatePostId();
  const createLikesAmount = getRandomInteger(LIKES_MIN, LIKES_MAX);
  const createCommentsAmount = getRandomInteger(COMMENTS_MIN, COMMENTS_MAX);

  const post = {
    id: postId,
    url: `photos/${postId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: createLikesAmount,
    comments: createComments(createCommentsAmount),
  };

  return post;
};

const createPosts = () => {
  const posts = [];
  for (let i = 0; i < POSTS_AMOUNT; i++) {
    posts.push(createPost());
  }
  return posts;
};

export {createPosts};
