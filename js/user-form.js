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

export { switchToInactiveState, switchToActiveState };
