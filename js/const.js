const BASE_URL = ' https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const MAX_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

export { Route, Method, Filter, BASE_URL, MAX_PHOTOS_COUNT, DEBOUNCE_DELAY, FILE_TYPES };
