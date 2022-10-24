import { getRandomInteger, getRandomFractNumber, getRandomArrayElement, transformImgNumber, getRandomLengthArray } from '../js/util.js';

const TYPES_OF_APPARTMENTS = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const TYPE_DICTIONARY = {
  palace: 'Замок',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};
const TIME_FRAMES = [
  '12:00',
  '13:00',
  '14:00'
];
const PHOTOS_ADDRESS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const COORDINATES = {
  MIN_LAT: 35.65000,
  MAX_LAT: 35.70000,
  MIN_LNG: 139.70000,
  MAX_LNG: 139.80000,
  NUMBER_OF_DECIMALS: 5
};
const ADS_COUNT = 10;

const createCardAd = (count) => {
  const randomLat = getRandomFractNumber(COORDINATES.MIN_LAT, COORDINATES.MAX_LAT, COORDINATES.NUMBER_OF_DECIMALS);
  const randomLng = getRandomFractNumber(COORDINATES.MIN_LNG, COORDINATES.MAX_LNG, COORDINATES.NUMBER_OF_DECIMALS);
  return {
    author: {
      avatar: `img/avatars/user${transformImgNumber(count)}.png`
    },

    offer: {
      title: `Заголовок_${getRandomInteger(1, 100)}`,
      address: `${randomLat}, ${randomLng}`,
      price: getRandomInteger(10000, 50000),
      type: TYPE_DICTIONARY[getRandomArrayElement(TYPES_OF_APPARTMENTS)],
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 4),
      checkin: getRandomArrayElement(TIME_FRAMES),
      checkout: getRandomArrayElement(TIME_FRAMES),
      features: getRandomLengthArray(FEATURES),
      description: `Описание_${getRandomInteger(1, 100)}`,
      photos: getRandomLengthArray(PHOTOS_ADDRESS)
    },

    location: {
      lat: `${randomLat}`,
      lng: `${randomLng}`
    }
  };
};

const createAdList = () => Array.from({ length: ADS_COUNT }, (_, index) => createCardAd(index + 1));

export { createAdList };
