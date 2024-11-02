import { Filter, MAX_PHOTOS_COUNT } from './const.js';
import { renderThumbnails } from './thumbnail.js';
import { picturesContainerElement, debounce } from './utils.js';

const filtersContainerElement = document.querySelector('.img-filters');

const filterByRandom = () => 0.5 - Math.random();
const filterByComments = (a, b) => b.comments.length - a.comments.length;

const filterPictures = (id, pictures) => {
  switch (id) {
    case Filter.DEFAULT:
      return pictures;
    case Filter.RANDOM:
      return [...pictures].sort(filterByRandom).slice(0, MAX_PHOTOS_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(filterByComments);
  }
};

const createFilteredPictures = (id, photos) => {
  const filteredPictures = filterPictures(id, photos);
  const pictures = picturesContainerElement.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
  renderThumbnails(filteredPictures, picturesContainerElement);
};

const debounceRender = debounce((id, photos) => createFilteredPictures(id, photos));

const initializeFilters = (photos) => {
  filtersContainerElement.classList.remove('img-filters--inactive');

  filtersContainerElement.addEventListener('click', (evt) => {
    if (evt.target.matches('.img-filters__button')) {
      const activeFilterButtonElement = filtersContainerElement.querySelector('.img-filters__button--active');
      activeFilterButtonElement.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      debounceRender(evt.target.id, photos);
    }
  });
};

export { initializeFilters };
