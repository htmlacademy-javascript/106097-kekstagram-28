const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 1;

  return () => lastGeneratedId++;
};

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

export {getRandomInteger, getRandomArrayElement, createIdGenerator, isEscapeKey, isEnterKey};
