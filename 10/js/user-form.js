const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const adFormSliders = adForm.querySelectorAll('.ad-form__slider');
const mapForm = document.querySelector('.map__filters');
const mapFilters = mapForm.querySelectorAll('.map__filter');
const mapFieldsets = mapForm.querySelectorAll('fieldset');

const switchStateForm = (isAdd) => {
  adForm.classList.toggle('ad-form--disabled', isAdd);
  mapForm.classList.toggle('map__filters--disabled', isAdd);
};

function switchStateElements(elements, isEnabled) {
  elements.forEach((element) => {
    element.disabled = isEnabled;
  });
}

const switchToInactiveState = () => {
  switchStateForm(true);

  switchStateElements(adFormFieldsets, true);
  switchStateElements(adFormSliders, true);
  switchStateElements(mapFilters, true);
  switchStateElements(mapFieldsets, true);
};

const switchToActiveState = () => {
  switchStateForm(false);

  switchStateElements(adFormFieldsets, false);
  switchStateElements(adFormSliders, false);
  switchStateElements(mapFilters, false);
  switchStateElements(mapFieldsets, false);
};

export { switchToInactiveState, switchToActiveState, adForm };
