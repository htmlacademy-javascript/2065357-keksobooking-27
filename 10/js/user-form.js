const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const fieldsOfForms = document.querySelectorAll('select.map__filter, fieldset');

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

export { switchPageMode, adForm };
