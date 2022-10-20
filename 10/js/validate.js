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
const titleField = document.querySelector('#title');
const typeField = document.querySelector('#type');
const priceField = document.querySelector('#price');
const roomsField = document.querySelector('#room_number');
const guestsField = document.querySelector('#capacity');
const timeInField = document.querySelector('#timein');
const timeOutField = document.querySelector('#timeout');

const validateTitle = (value) => value.length >= MIN_VALUE_OF_SYMBOLS && value.length <= MAX_VALUE_OF_SYMBOLS;

const validatePrice = (value) => {
  priceField.placeholder = MIN_PRICE_LIST[typeField.value];
  return value >= MIN_PRICE_LIST[typeField.value] && value <= MAX_PRICE;
};

const validateCapacity = () =>
  roomsField.value === '100' ? guestsField.value === '0' : roomsField.value >= guestsField.value && guestsField.value !== '0';

const validateTimeIn = () => {
  timeOutField.value = timeInField.value;
  return timeInField.value === timeOutField.value;
};

const validateTimeOut = () => {
  timeInField.value = timeOutField.value;
  return timeInField.value === timeOutField.value;
};

const getPriceErrorMessage = () => `От ${MIN_PRICE_LIST[typeField.value]} руб. до ${MAX_PRICE} руб.`;

function getCapacityErrorMessage() {
  if (roomsField.value === '100') {
    return 'Не для гостей';
  }
  if (guestsField.value === '0') {
    return 'Необходимо 100 комнат';
  }
  return `Необходимо минимум ${guestsField.value} комнаты.`;
}

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
pristine.addValidator(
  timeInField,
  validateTimeIn
);
pristine.addValidator(
  timeOutField,
  validateTimeOut
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

// слайдер
const adFormSlider = document.querySelector('.ad-form__slider');

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
    adForm.submit();
  }
});
