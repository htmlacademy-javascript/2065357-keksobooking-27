// подсмотрел функцию на https://schoolsw3.com/js/js_random.php
function getRandomInteger(min, max) {

  if (Math.sign(max) === -1 || Math.sign(min) === -1 || max === min) {
    return NaN;
  }

  if (max < min) {
    const reverse = max;
    max = min;
    min = reverse;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInteger(1, 15);

// Функция, возвращающая число с указанным количеством знаков после запятой.
function getRandomFractNumber(min, max, decimalPlaces) {

  if (Math.sign(max) === -1 || Math.sign(min) === -1 || max === min) {
    return NaN;
  }

  if (max < min) {
    const reverse = max;
    max = min;
    min = reverse;
  }

  return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
}

getRandomFractNumber(1.1, 1.2, 3);

// Создаём массив объектов
const TYPES_OF_APPARTMENTS = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME_FRAMES = ['12:00', '13:00', '14:00'];
const PHOTOS_ADDRESS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const countImgNumber = createCounter();

const getRandomIndex = (arr) => getRandomInteger(0, arr.length - 1);
const transformImgNumber = (number) => number.toString().padStart(2, '0');

function getRandomLengthArray(arr) {
  const someValues = [];
  const lengthOfArray = getRandomInteger(1, arr.length);
  for (let i = 0; i < lengthOfArray; i++) {
    if (!someValues.includes(arr[i])) {
      someValues.push(arr[i]);
    }
  }
  return someValues;
}

function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

function createCardAd() {
  return {
    author: {
      avatar: `img/avatars/user${transformImgNumber(countImgNumber())}.png`
    },

    location: {
      lat: getRandomFractNumber(35.65000, 35.70000, 5),
      lng: getRandomFractNumber(139.70000, 139.80000, 5)
    },

    offer: {
      title: `Title${getRandomInteger(1, 100)}`,
      address: `${location.lat}, ${location.lng}`,
      price: `${getRandomInteger(100, 500)}$`,
      type: `${TYPES_OF_APPARTMENTS[getRandomIndex(TYPES_OF_APPARTMENTS)]}`,
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 4),
      checkin: `${TIME_FRAMES[getRandomIndex(TIME_FRAMES)]}`,
      checkout: `${TIME_FRAMES[getRandomIndex(TIME_FRAMES)]}`,
      features: getRandomLengthArray(FEATURES),
      description: `Description${getRandomInteger(1, 100)}`,
      photos: getRandomLengthArray(PHOTOS_ADDRESS)
    }
  };
}

const adList = Array.from({ length: 10 }, createCardAd);

// eslint-disable-next-line no-console
console.log(adList);
