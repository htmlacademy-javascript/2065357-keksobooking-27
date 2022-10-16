const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const adFormSliders = adForm.querySelectorAll('.ad-form__slider');
const mapForm = document.querySelector('.map__filters');
const mapFilters = mapForm.querySelectorAll('.map__filter');
const mapFieldsets = mapForm.querySelectorAll('fieldset');

const disableForm = (form) => form.classList.add(`${form.className}--disabled`);
const enableForm = (form) => form.classList.remove(`${form.className}--disabled`);

function disableInteractiveElements(elements) {
  elements.forEach((element) =>
    element.setAttribute('disabled', 'disabled'));
}

function enableInteractiveElements(elements) {
  elements.forEach((element) =>
    element.removeAttribute('disabled', 'disabled'));
}

function switchToInactiveState() {
  disableForm(mapForm);
  disableForm(adForm);

  disableInteractiveElements(adFormFieldsets);
  disableInteractiveElements(adFormSliders);
  disableInteractiveElements(mapFilters);
  disableInteractiveElements(mapFieldsets);
}

function switchToActiveState() {
  enableForm(mapForm);
  enableForm(adForm);

  enableInteractiveElements(adFormFieldsets);
  enableInteractiveElements(adFormSliders);
  enableInteractiveElements(mapFilters);
  enableInteractiveElements(mapFieldsets);
}

// Валидация
const MAX_VALUE_OF_SYMBOLS = 100;
const MIN_VALUE_OF_SYMBOLS = 30;
const MAX_PRICE = 100000;
const titleField = adForm.querySelector('#title');
const priceField = adForm.querySelector('#price');
const roomsField = adForm.querySelector('#room_number');
const guestsField = adForm.querySelector('#capacity');

const validateTitle = (value) => value.length >= MIN_VALUE_OF_SYMBOLS && value.length <= MAX_VALUE_OF_SYMBOLS;
const validatePrice = (value) => value <= MAX_PRICE;
const validateCapacity = () =>
  roomsField.value === '100' ? guestsField.value === '0' : roomsField.value >= guestsField.value && guestsField.value !== '0';

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
  `Максимальная цена ${MAX_PRICE} руб.`
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

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    adForm.submit();
  }
});

export { switchToInactiveState, switchToActiveState };
