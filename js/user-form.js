import { request } from './api.js';
import { resetFilters } from './filter.js';
import { updateMainMarker } from './map.js';
import { adForm, adFormSlider, pristine, setPricePlaceholder } from './validate.js';


const mapFilters = document.querySelector('.map__filters');
const mapFields = mapFilters.querySelectorAll('select.map__filter');
const adFormFields = adForm.querySelectorAll('fieldset');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');

const switchStateElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = !element.disabled;
  });
};

const switchStateMapFilters = () => {
  mapFilters.classList.toggle('map__filters--disabled');

  switchStateElements(mapFields);
};

const switchStateAdForm = () => {
  adForm.classList.toggle('ad-form--disabled');

  switchStateElements(adFormFields);
};

const switchPageMode = () => {
  switchStateMapFilters();
  switchStateAdForm();
};


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetForm = (form) => {
  adFormSlider.noUiSlider.set(0);
  pristine.reset();
  resetFilters();
  form.reset();
  setPricePlaceholder();
  updateMainMarker();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm(adForm);
});

const setAdFormSubmit = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      request(
        () => {
          onSuccess();
          resetFilters();
          resetForm(evt.target);
          unblockSubmitButton();
        },
        () => {
          onError();
          unblockSubmitButton();
        },
        'POST',
        new FormData(evt.target)
      );
    }
  });
};

export { setAdFormSubmit, switchPageMode, switchStateMapFilters, switchStateAdForm };
