import { renderPosts } from './thumbnail.js';
import { getRandomArrayElement } from './util.js';

const RANDOM_IMAGES_AMOUNT = 10;

const filters = document.querySelector('.img-filters');
const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');
const filterActiveClass = 'img-filters__button--active';

const showFilters = () => filters.classList.remove('img-filters--inactive');

const clearFiltersActiveStyle = () => document.querySelectorAll('.img-filters__button').forEach((element) => element.classList.remove(filterActiveClass));

const setDefaultOrder = (callback) => {
  defaultFilter.addEventListener('click', () => {
    clearFiltersActiveStyle();
    defaultFilter.classList.add(filterActiveClass);
    callback();
  });
};

const renderRandomPosts = (posts) => {
  const copiedArray = posts.slice();
  const uniquePosts = new Set;
  for (let i = 0; i < copiedArray.length - 1; i++) {
    uniquePosts.add(getRandomArrayElement(copiedArray));
    if (Object.keys(uniquePosts).length > RANDOM_IMAGES_AMOUNT) {
      break;
    }
  }
  renderPosts(Array.from(uniquePosts));
};

const setRandomOrder = (callback) => {
  randomFilter.addEventListener('click', () => {
    clearFiltersActiveStyle();
    randomFilter.classList.add(filterActiveClass);
    callback();
  });
};

const comparePosts = (postA, postB) => {
  const commentsCountA = postA.comments.length;
  const commentsCountB = postB.comments.length;
  return commentsCountB - commentsCountA;
};

const renderDiscussedOrder = (posts) => {
  const copiedArray = posts.slice().sort(comparePosts);
  renderPosts(copiedArray);
};

const setDiscussedOrder = (callback) => {
  discussedFilter.addEventListener('click', () => {
    clearFiltersActiveStyle();
    discussedFilter.classList.add(filterActiveClass);
    callback();
  });
};

export { showFilters, setDefaultOrder, setRandomOrder, renderRandomPosts, setDiscussedOrder, renderDiscussedOrder };
