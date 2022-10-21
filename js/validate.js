import { adForm } from './user-form.js';

const MAX_VALUE_OF_SYMBOLS = 100;
const MIN_VALUE_OF_SYMBOLS = 30;
const MAX_PRICE = 100000;
const MIN_PRICE_LIST = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};
const titleField = adForm.querySelector('#title');
const typeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const roomsField = adForm.querySelector('#room_number');
const guestsField = adForm.querySelector('#capacity');
const timeInField = adForm.querySelector('#timein');
const timeOutField = adForm.querySelector('#timeout');

const validateTitle = (value) => value.length >= MIN_VALUE_OF_SYMBOLS && value.length <= MAX_VALUE_OF_SYMBOLS;

const validatePrice = (value) => {
  priceField.placeholder = MIN_PRICE_LIST[typeField.value];
  return value >= MIN_PRICE_LIST[typeField.value] && value <= MAX_PRICE;
};

const validateCapacity = () =>
  roomsField.value === '100' ? guestsField.value === '0' : roomsField.value >= guestsField.value && guestsField.value !== '0';

const getPriceErrorMessage = () => `От ${MIN_PRICE_LIST[typeField.value]} руб. до ${MAX_PRICE} руб.`;

const getCapacityErrorMessage = () => {
  if (roomsField.value === '100') {
    return 'Не для гостей';
  }
  if (guestsField.value === '0') {
    return 'Необходимо 100 комнат';
  }
  return `Необходимо минимум ${guestsField.value} комнаты.`;
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help'
});

pristine.addValidator(
  titleField,
  validateTitle,
  `От ${MIN_VALUE_OF_SYMBOLS} до ${MAX_VALUE_OF_SYMBOLS} символов`
);
pristine.addValidator(
  priceField,
  validatePrice,
  getPriceErrorMessage
);
pristine.addValidator(
  guestsField,
  validateCapacity,
  getCapacityErrorMessage
);
pristine.addValidator(
  roomsField,
  validateCapacity,
  getCapacityErrorMessage
);

typeField.addEventListener('change', () => {
  priceField.placeholder = MIN_PRICE_LIST[typeField.value];
  pristine.validate(priceField);
});

roomsField.addEventListener('change', () => {
  pristine.validate(guestsField);
});

guestsField.addEventListener('change', () => {
  pristine.validate(roomsField);
});

timeInField.addEventListener('change', () => {
  timeOutField.value = timeInField.value;
});

timeOutField.addEventListener('change', () => {
  timeInField.value = timeOutField.value;
});

// слайдер
const adFormSlider = adForm.querySelector('.ad-form__slider');

noUiSlider.create(adFormSlider, {
  range: {
    min: 0,
    max: MAX_PRICE
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

adFormSlider.noUiSlider.on('change', () => {
  priceField.value = adFormSlider.noUiSlider.get();
  pristine.validate(priceField);
});

priceField.addEventListener('input', () => {
  if (priceField.value === '') {
    adFormSlider.noUiSlider.set(0);
  }
  adFormSlider.noUiSlider.set(priceField.value);
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    evt.target.submit();
  }
});
