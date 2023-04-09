import { renderPhoto } from './render-photo.js';
import { shuffleArray, debounce } from './util.js';

const RANDOM_COMMENT_COUNT = 10;
const RERENDER_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');

const removeElements = (elements) => {
  elements.forEach((element) => element.remove());
};

const rerenderPhotos = (data, id) => {
  const photoElements = document.querySelectorAll('.picture');
  const dataCopy = data.slice();
  let sortArray = dataCopy;
  removeElements(photoElements);
  if (id === 'filter-discussed') {
    sortArray = dataCopy.sort((a, b) => b.comments.length - a.comments.length);
  }
  if (id === 'filter-random') {
    sortArray = shuffleArray(dataCopy).slice(0, RANDOM_COMMENT_COUNT);
  }
  renderPhoto(sortArray);
};

const rerenderTimeout = debounce((data, id) => rerenderPhotos(data, id), RERENDER_DELAY);

const onImgFiltersClick = (evt, data) => {
  const imgFiltersButtonActive = document.querySelector('.img-filters__button--active');
  if (evt.target.closest('.img-filters__button') && !evt.target.closest('.img-filters__button--active')) {
    imgFiltersButtonActive.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    const id = evt.target.id;
    rerenderTimeout(data, id);
  }
};

const initFilter = (data) => {
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', (evt) => {
    onImgFiltersClick(evt, data);
  });
};

export { initFilter };
