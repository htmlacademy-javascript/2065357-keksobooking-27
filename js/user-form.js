import { request } from './api.js';
import { updateMainMarker } from './map.js';
import { adForm, adFormSlider, pristine, setPricePlaceholder } from './validate.js';

const mapForm = document.querySelector('.map__filters');
const fieldsOfForms = document.querySelectorAll('select.map__filter, fieldset');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');

const switchStateElements = () => {
  fieldsOfForms.forEach((element) => {
    element.disabled = !element.disabled;
  });
};

const switchPageMode = () => {
  adForm.classList.toggle('ad-form--disabled');
  mapForm.classList.toggle('map__filters--disabled');

  switchStateElements();
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

export { setAdFormSubmit, switchPageMode };
